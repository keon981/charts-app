import { Suspense, useMemo } from 'react'

import { useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { apiBase, baseOptions } from '@/serve/useChartQuery'

interface Props {}

// eslint-disable-next-line unused-imports/no-unused-vars
function DosePage({ ...props }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-bold">Dose Page</h2>
      <div className="flex gap-6 justify-center">
        <Suspense fallback={<div>loading...1</div>}>
          <DoseChart times={1} />
        </Suspense>
      </div>

    </section>
  )
}

function DoseChart({ times }: { times: number }) {
  const { data, isError, error } = useSuspenseQuery({
    queryKey: ['dose', times], // 加入 times 讓 queryKey 不同，避免快取問題兩個同時回傳資料
    queryFn: () => getDoseData(times),
    ...baseOptions,
  })

  const series = data?.series ?? []

  // 將 { series: [{ name, data: [{ dose, volume }, ...] }, ...] }
  // 轉換為 [{ dose, series_1, series_2, ... }, ...]
  const seriesData = useMemo(() => {
    if (!Array.isArray(series) || series.length === 0)
      return [] as Array<Record<string, number>>

    // 收集所有劑量刻度並排序
    const doseSet = new Set<number>()
    for (const s of series) {
      for (const p of s?.data ?? []) doseSet.add(Number(p.dose))
    }
    const doses = Array.from(doseSet).sort((a, b) => a - b)

    // 建立 dose -> { seriesName -> volume } 查表
    const map = new Map<number, Record<string, number>>()
    for (const d of doses) map.set(d, { dose: d })
    for (const s of series) {
      const name = s?.name
      for (const p of s?.data ?? []) {
        const d = Number(p.dose)
        const row = map.get(d)!
        row[name] = Number(p.volume)
      }
    }
    return doses.map(d => map.get(d)!)
  }, [series])

  // 穩定的隨機色：根據系列生成一次顏色
  const colorMap = useMemo(() => {
    const map = new Map<string, string>()
    const rand = () => Math.random()
    for (const s of series) {
      // 調整範圍避免過暗/過淡
      const L = (0.45 + rand() * 0.4).toFixed(3) // 0.45–0.85
      const C = (0.06 + rand() * 0.2).toFixed(3) // 0.06–0.26
      const H = (rand() * 360).toFixed(1)
      map.set(s.name, `oklch(${L} ${C} ${H})`)
    }
    return map
  }, [series])

  if (isError) return <div>錯誤: {error?.message}</div>

  return (
    <div className="w-[560px] h-[360px]">
      <h3 className="text-xl font-bold mb-2">Times: {times}</h3>
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
          syncId="anyId"
          data={seriesData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dose"
            tickFormatter={v => Number(v).toFixed(2)}
            label={{ value: 'Dose (Gy)', position: 'insideBottom' }}
          />
          <YAxis
            type="number"
            dataKey="volume"
            domain={[0, 100]}
            tickFormatter={v => `${v}%`}
            label={{ value: 'Volume (%)', position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {series.map((s: any) => (
            <Line
              key={s.name}
              type="monotone"
              name={s.name}
              dataKey={s.name}
              stroke={colorMap.get(s.name)}
            />
          ))}
          <Brush />
          {/* <Line
            type="monotone"
            dataKey="volume"
            stroke="red"
            dot={false}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  const dose = Number(label)
  return (
    <div className="rounded-md bg-background/95 p-2 shadow border text-foreground">
      <div className="text-xs mb-1">Dose: {dose.toFixed(3)} Gy</div>
      {payload.map((p: any) => {
        const v = Number(p.value)
        return (
          <div key={p.name} className="text-xs flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span>{p.name}</span>
            <span className="ml-auto">{v.toFixed(2)}%</span>
          </div>
        )
      })}
    </div>
  )
}

async function getDoseData(times: number): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 1000 * times))
  const response = await axios.get(`${apiBase}/dose`)
  return response.data
}

export default DosePage
