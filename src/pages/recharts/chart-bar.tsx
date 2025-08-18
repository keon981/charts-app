import React from 'react'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface Props<T extends object> {
  data: T
}

const chartConfig = {
  total: {
    label: 'Total',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig<'total'>

function ChartBar<T extends object>({ data }: Props<T>) {
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

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={filteredData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="total" fill="var(--color-total)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}

export default ChartBar
