import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useChartCard } from '@/components/ui/chart.card'

interface Props<T extends object> {
  data: T
}

function ChartBar<T extends object>({ data }: Props<T>) {
  const { selectValue } = useChartCard()
  const chartConfig = getChartConfig(selectValue ?? 'all')

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
      <ChartContainer
        key={selectValue}
        config={chartConfig}
      >
        <BarChart accessibilityLayer data={filteredData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          {barConfig.map(item => (<Bar key={`${item.dataKey}`} {...item} />))}
        </BarChart>
      </ChartContainer>
    )
  }

  return (
    <ChartContainer key={selectValue} config={chartConfig}>
      <BarChart accessibilityLayer data={filteredData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey={selectValue ?? 'total'} fill={`var(--color-${selectValue})`} radius={8} />
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
