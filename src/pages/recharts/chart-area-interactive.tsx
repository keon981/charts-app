'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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

export const description = 'An interactive area chart'

const chartConfig = {
  total: {
    label: 'Total',
    color: 'var(--chart-5)',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig<'desktop' | 'mobile' | 'total'>

interface Props<T extends object> {
  data: T
}

function ChartAreaInteractive<T extends object>({ data }: Props<T>) {
  const filteredData = Object.entries(data).map((item) => {
    const [month, value] = item
    return {
      month,
      desktop: value.desktop,
      mobile: value.mobile,
      total: value.total,
    }
  })

  const handleLegendClick = (dataKey: any) => {
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
      <AreaChart data={filteredData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={0}
          interval={0}

        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip
          cursor={false}
          content={(
            <ChartTooltipContent indicator="dot" />
          )}
        />
        <Area
          dataKey="mobile"
          type="natural"
          fill="url(#fillMobile)"
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="url(#fillDesktop)"
          stroke="var(--color-desktop)"
          stackId="b"
        />
        <Area
          dataKey="total"
          type="natural"
          fill="url(#fillTotal)"
          stroke="var(--color-total)"
          stackId="C"
        />
        <ChartLegend
          content={(
            <ChartLegendContent renderPayload={payload => (
              <CharyLegendPayload payload={payload} onClick={() => handleLegendClick(payload.dataKey)} />
            )}
            />
          )}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export default ChartAreaInteractive
