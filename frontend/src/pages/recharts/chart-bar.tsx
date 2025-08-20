import { useState } from 'react'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useChartCard } from '@/components/ui/chart.card'
import { filterDateData } from '@/lib/utils'

interface Props<T extends object> {
  data: T
}

interface MonthData {
  month: string
  desktop: number
  mobile: number
  total: number
}

interface BarContentProps<T extends object> extends Props<T> {
  dataKey: string
  config: ChartConfig<string>
  children: React.ReactNode
  xAxisProps?: Omit<React.ComponentProps<typeof XAxis>, 'ref'>
}

function ChartBar<T extends object>({ data }: Props<T>) {
  const [dayData, setDayData] = useState([])
  const { selectValue, page, setPage, setDescription } = useChartCard()
  const chartConfig = getChartConfig(selectValue ?? 'all')

  const monthKeys = Object.keys(data)
  const filterMonthData: Array<MonthData> = Object
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

  // handlers
  const handleBarClick = (barData: any) => {
    const activeLabel = barData.month
    const dateData = filterDateData(data, activeLabel)
    const description = monthKeys.find(v => v.slice(0, 3) === activeLabel)
    setDescription(`${description ?? ''}, 2024`)
    setDayData(dateData)
    setPage(2)
  }

  if (page === 2) {
    return (
      <BarContainer
        data={dayData}
        dataKey="date"
        config={chartConfig}
        xAxisProps={{
          tickFormatter: (value) => {
            const date = new Date(value)
            return date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          },
        }}
      />
    )
  }

  return (
    <BarContainer
      data={filterMonthData}
      dataKey="month"
      config={chartConfig}
      barProps={{ onClick: handleBarClick }}
    />
  )
}

function BarContainer<T extends Array<any>>({ barProps, ...props }: Omit<BarContentProps<T>, 'children'> & {
  barProps?: Omit<React.ComponentProps<typeof Bar>, 'ref' | 'dataKey'>
}) {
  const { selectValue } = useChartCard()

  // all | multiple
  if (!['desktop', 'mobile', 'total'].includes(selectValue ?? '')) {
    const barConfig: Array<Omit<React.ComponentProps<typeof Bar>, 'ref'>> = selectValue === 'multiple'
      ? [
          { dataKey: 'mobile', fill: 'var(--color-mobile)', radius: 4 },
          { dataKey: 'desktop', fill: 'var(--color-desktop)', radius: 4 },
        ]
      : [
          { dataKey: 'mobile', stackId: 'a', fill: 'var(--color-mobile)', radius: [0, 0, 4, 4] },
          { dataKey: 'desktop', stackId: 'a', fill: 'var(--color-desktop)', radius: [4, 4, 0, 0] },
        ]

    return (
      <BarContent key={selectValue} {...props}>
        {barConfig.map(item => (<Bar key={`${item.dataKey}`} {...barProps} {...item} />))}
      </BarContent>
    )
  }

  return (
    <BarContent {...props}>
      <Bar dataKey={selectValue ?? 'total'} fill={`var(--color-${selectValue})`} radius={4} {...barProps} />
    </BarContent>
  )
}

function BarContent<T extends Array<object>>({ data, dataKey, config, children, xAxisProps }: BarContentProps<T>) {
  return (
    <ChartContainer config={config}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKey}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={value => value.slice(0, 3)}
          {...xAxisProps}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        {children}
      </BarChart>
    </ChartContainer>
  )
}

function getChartConfig<T extends string>(selectValue: T): ChartConfig<T> {
  switch (selectValue) {
    case 'total':
      return {
        total: {
          label: 'Total',
          color: 'var(--chart-5)',
        },
      } as ChartConfig<T>
    case 'desktop':
      return {
        desktop: {
          label: 'Desktop',
          color: 'var(--chart-1)',
        },
      } as ChartConfig<T>
    case 'mobile':
      return {
        mobile: {
          label: 'Mobile',
          color: 'var(--chart-2)',
        },
      } as ChartConfig<T>
    default:
      return {
        desktop: {
          label: 'Desktop',
          color: 'var(--chart-1)',
        },
        mobile: {
          label: 'Mobile',
          color: 'var(--chart-2)',
        },
      } as ChartConfig<T>
  }
}

export default ChartBar
