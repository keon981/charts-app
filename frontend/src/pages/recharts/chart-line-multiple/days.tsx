'use client'

import { useMemo } from 'react'

import { Drama } from 'lucide-react'
import { Area, Bar } from 'recharts'
import type { Line } from 'recharts'
import type { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart'
import type { AxisDomain } from 'recharts/types/util/types'

import LineChartContent from './content'
import type {
  ChartConfig,
} from '@/components/ui/chart'
import { useChartCard } from '@/components/ui/chart.card'

export const description = 'An interactive area chart'

const area = {
  area1: [
    280,
    320,
  ],
  area2: [
    0,
    280,
  ],
  area3: [320, 550],
}

const chartConfig = {
  total: {
    label: 'Total',
    color: 'var(--chart-5)',
    icon: () => <Drama stroke="var(--color-total)" />,
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
    icon: () => <Drama stroke="var(--color-desktop)" />,
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
    icon: () => <Drama stroke="var(--color-mobile)" />,
  },
  area3: {
    label: 'area3',
    color: 'rgba(255, 0, 0, 0.45)', // 上
  },
  area1: {
    label: 'area1',
    color: 'rgba(0, 255, 0, 0.45)', // 中
  },
  area2: {
    label: 'area2',
    color: 'rgba(0, 0, 255, 0.45)', // 下
  },
} satisfies ChartConfig<'desktop' | 'mobile' | 'total' | 'area1' | 'area2' | 'area3'>

type LineIndicatorType = 'dots' | 'label' | 'custom dots' | 'custom label' | null

interface Props<T extends object> {
  data: T
  indicator?: LineIndicatorType
  allowDataOverflow?: boolean
  domain: AxisDomain
  spacing?: number | null
}
type LineProps = Omit<React.ComponentProps<typeof Line>, 'ref'>

function getTicks(domain: AxisDomain, spacing?: number | null): number[] | undefined {
  if (typeof domain === 'function') return undefined
  if (typeof domain[1] !== 'number') return undefined
  if (!spacing) return undefined

  const [min, max] = domain
  const minValue = Number(min) > 0 ? min as number : 0
  const ticks: number[] = []
  for (let v = minValue; v <= max; v += spacing) {
    ticks.push(v)
  }

  return ticks
}

function ChartLineMultipleDays<T extends object>({
  data,
  indicator,
  domain,
  allowDataOverflow = false,
  spacing,
}: Props<T>) {
  const { selectValue } = useChartCard()
  const selectValueMemo = useMemo(() => indicator ?? selectValue, [selectValue])
  const ticks = getTicks(domain, spacing)

  // memo
  const _domain = useMemo(() => {
    if (typeof domain === 'function') return domain
    const min = typeof domain[0] === 'number' ? domain[0] : 0
    const max = typeof domain[1] === 'number' ? domain[1] : 0
    return [min, max]
  }, [domain])

  const filteredData = Object
    .values(data)
    .flatMap((item) => {
      const dates = item.data.map(i => ({
        ...i,
        ...area,
        total: i.desktop + i.mobile,
      }))
      return dates
    })

  const handleLineChartClick: CategoricalChartFunc = (state) => {
    console.log(state)
  }

  return (
    <LineChartContent
      selectValue={selectValueMemo}
      config={chartConfig}
      data={filteredData}
      xAxisProps={{
        dataKey: 'date',
        hide: true,
      }}
      yAxisProps={{
        type: 'number',
        domain: _domain,
        interval: 0,
        allowDataOverflow, // 避免被美化
        ticks,
      }}
      lineChartProps={{
        onClick: handleLineChartClick,
      }}
      chartTooltipProps={{
        cursor: { strokeWidth: 2 },
      }}
    >
      {/*
        <Bar type="monotone" dataKey="area1" fill="var(--color-area1)" />
        <Bar type="monotone" dataKey="area2" fill="var(--color-area2)" />
        <Bar type="monotone" dataKey="area3" fill="var(--color-area3)" />
      */}
      {Object.entries(area).map(i => (
        <Area
          key={i[0]}
          type="monotone"
          dataKey={i[0]}
          fill={`var(--color-${i[0]})`}
          strokeOpacity={0}
          activeDot={false}
        />
      ))}
    </LineChartContent>
  )
}

export default ChartLineMultipleDays
export type { LineIndicatorType, LineProps }
