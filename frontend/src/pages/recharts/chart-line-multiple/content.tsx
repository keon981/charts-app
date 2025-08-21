import { useState } from 'react'

import { GitCommitVertical } from 'lucide-react'
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  CharyLegendPayload,
} from '@/components/ui/chart'
import type {
  ChartContentProps,
} from '@/components/ui/chart'

type LineIndicatorType = 'dots' | 'label' | 'custom dots' | 'custom label' | null

type LineProps = Omit<React.ComponentProps<typeof Line>, 'ref'>

interface LineChartContentProps<T extends string, P extends object[]> extends ChartContentProps<T, P> {
  selectValue: string | null
}

const defaultLines = ['mobile', 'desktop', 'total']

function LineChartContent<T extends string, P extends object[]>({
  config,
  data,
  lineChartProps,
  selectValue,
  xAxisProps,
}: LineChartContentProps<T, P>) {
  const [legendLines, setLegendLines] = useState(defaultLines)

  const handleLegendClick = (dataKey: any) => {
    if (!dataKey && typeof dataKey !== 'string') return

    setLegendLines((prev) => {
      if (prev.includes(dataKey)) {
        return prev.filter(item => item !== dataKey)
      }
      return [...prev, dataKey]
    })
  }
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-[250px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          left: 12,
          right: 12,
        }}
        {...lineChartProps}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}
          {...xAxisProps}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip
          cursor={false}
          content={(
            <ChartTooltipContent indicator="dot" />
          )}
        />
        {defaultLines.map((item) => {
          const lineProps = selectValue ? indicatorSetting(selectValue as LineIndicatorType, item) : {}

          return (
            <Line
              key={item}
              dataKey={item}
              type="monotone"
              stroke={`var(--color-${item})`}
              strokeWidth={2}

              dot={false}
              hide={!legendLines.includes(item)}
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
                  data-active={legendLines.includes(payload.dataKey as string)}
                  onClick={() => handleLegendClick(payload.dataKey)}
                  className="px-2 py-1 rounded hover:bg-white/10 data-[active=false]:line-through"
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

export default LineChartContent
export type { LineIndicatorType, LineProps }
