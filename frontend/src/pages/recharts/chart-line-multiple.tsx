'use client'

import { useMemo, useState } from 'react'

import { Drama, GitCommitVertical } from 'lucide-react'
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts'
import type { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart'

import type {
  ChartConfig,
  ChartContentProps,
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
import { filterDateData } from '@/lib/utils'

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

const defaultLines = ['mobile', 'desktop', 'total']

type LineIndicatorType = 'dots' | 'label' | 'custom dots' | 'custom label' | null

interface Props<T extends object> {
  data: T
  indicator?: LineIndicatorType
}
type LineProps = Omit<React.ComponentProps<typeof Line>, 'ref'>

function ChartLineMultiple<T extends object>({ data, indicator }: Props<T>) {
  const { selectValue, setPage, page, setDescription } = useChartCard()
  const [dayData, setDayData] = useState([])
  const selectValueMemo = useMemo(() => indicator ?? selectValue, [selectValue])

  const monthKeys = Object.keys(data)
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

  const handleLineChartClick: CategoricalChartFunc = (state) => {
    const { activeLabel } = state

    const dateData = filterDateData(data, activeLabel)
    const description = monthKeys.find(v => v.slice(0, 3) === activeLabel)
    setDescription(`${description ?? ''}, 2024`)
    setDayData(dateData)
    setPage(2)
  }

  if (page === 2) {
    return (
      <LineChartContent
        config={chartConfig}
        data={dayData}
        selectValue={selectValueMemo}
        lineChartProps={{
          onClick: handleLineChartClick,
        }}
        xAxisProps={{
          dataKey: 'date',
          tickFormatter: (value) => {
            const date = new Date(value)
            const localeDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
            return localeDate.slice(3)
          },
        }}
      />
    )
  }

  return (
    <LineChartContent
      selectValue={selectValueMemo}
      config={chartConfig}
      data={filteredData}
      lineChartProps={{
        onClick: handleLineChartClick,
      }}
    />
  )
}

interface LineChartContentProps<T extends string, P extends object[]> extends ChartContentProps<T, P> {
  selectValue: string | null
}

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

export default ChartLineMultiple
export type { LineIndicatorType, LineProps }
