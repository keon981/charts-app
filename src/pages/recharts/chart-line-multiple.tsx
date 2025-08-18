'use client'

import { useMemo } from 'react'

import { Drama, GitCommitVertical } from 'lucide-react'
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts'

import type {
  ChartConfig,
} from '@/components/ui/chart'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  CharyLegendPayload,
} from '@/components/ui/chart'
import { useChartCard } from '@/components/ui/chart.card'

export const description = 'An interactive area chart'

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
} satisfies ChartConfig<'desktop' | 'mobile' | 'total'>

type LineIndicatorType = 'dots' | 'label' | 'custom dots' | 'custom label' | null

interface Props<T extends object> {
  data: T
  indicator?: LineIndicatorType
}
type LineProps = Omit<React.ComponentProps<typeof Line>, 'ref'>

function ChartLineMultiple<T extends object>({ data, indicator }: Props<T>) {
  const { selectValue } = useChartCard()
  const selectValueMemo = useMemo(() => indicator ?? selectValue, [selectValue])

  const filteredData = Object
    .entries(data)
    .map((item) => {
      const [month, value] = item
      return {
        month: month.slice(0, 3),
        desktop: value.desktop,
        mobile: value.mobile,
        total: value.total,
      }
    })

  const handleLegendClick = (dataKey: any) => {
    console.log('dataKey', dataKey)

    if (dataKey && typeof dataKey === 'string') {
      // 在這裡添加您想要的邏輯
      // 例如：切換資料顯示、篩選資料等
      // 可以根據 dataKey 來切換顯示/隱藏對應的資料系列
    }
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={filteredData}
        margin={{
          top: 20,
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}

        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip
          cursor={false}
          content={(
            <ChartTooltipContent indicator="dot" />
          )}
        />
        {['mobile', 'desktop', 'total'].map((item) => {
          const lineProps = selectValueMemo ? indicatorSetting(selectValueMemo as LineIndicatorType, item) : {}
          return (
            <Line
              key={item}
              dataKey={item}
              type="monotone"
              stroke={`var(--color-${item})`}
              strokeWidth={2}
              dot={false}
              {...lineProps}
            />
          )
        })}
        <ChartLegend
          content={(
            <ChartLegendContent
              renderPayload={(payload, index) => (
                <CharyLegendPayload
                  key={index}
                  payload={payload}
                  onClick={() => handleLegendClick(payload.dataKey)}
                  className="px-2 py-1 rounded hover:bg-white/20 "
                />
              )}
            />
          )}
        />
      </LineChart>
    </ChartContainer>
  )
}

function indicatorSetting(indicator: LineIndicatorType, dataKey: string): LineProps {
  switch (indicator) {
    case 'dots':
      return {
        dot: true,
        activeDot: {
          r: 6,
        },
      }
    case 'label':
      return {
        children: (
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        ),
      }
    case 'custom dots':
      return {
        dot: ({ cx, cy, payload }) => {
          const r = 24
          return (
            <GitCommitVertical
              key={payload.month}
              x={cx - r / 2}
              y={cy - r / 2}
              width={r}
              height={r}
              fill="hsl(var(--background))"
              stroke={`var(--color-${dataKey})`}
            />
          )
        },
      }
    default:
      return {}
  }
}

export default ChartLineMultiple
export type { LineIndicatorType, LineProps }
