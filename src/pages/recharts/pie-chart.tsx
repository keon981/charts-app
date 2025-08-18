'use client'

import { Pie, PieChart } from 'recharts'

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

export const description = 'A pie chart with a label'

interface Props<T extends object> {
  data: T
}

const chartConfig = {
  January: {
    label: 'Jan',
    color: 'var(--chart-1)',
  },
  February: {
    label: 'Feb',
    color: 'var(--chart-2)',
  },
  March: {
    label: 'Mar',
    color: 'var(--chart-3)',
  },
  April: {
    label: 'Apr',
    color: 'var(--chart-4)',
  },
  May: {
    label: 'May',
    color: 'var(--chart-5)',
  },
  June: {
    label: 'Jun',
    color: 'var(--chart-6)',
  },
  July: {
    label: 'Jul',
    color: 'var(--chart-7)',
  },
  August: {
    label: 'Aug',
    color: 'var(--chart-8)',
  },
  September: {
    label: 'Sep',
    color: 'var(--chart-9)',
  },
  October: {
    label: 'Oct',
    color: 'var(--chart-10)',
  },
  November: {
    label: 'Nov',
    color: 'var(--chart-11)',
  },
  December: {
    label: 'Dec',
    color: 'var(--chart-12)',
  },
} satisfies ChartConfig<MonthType>

function ChartPieLabel<T extends object>({ data }: Props<T>) {
  const chartData = Object
    .entries(data)
    .map((item) => {
      const [month, value] = item

      return {
        month,
        desktop: value.desktop,
        mobile: value.mobile,
        total: value.total,
        fill: `var(--color-${month})`,
      }
    })

  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[400px] pb-0"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="total" label nameKey="month" />
        <ChartLegend
          content={(
            <ChartLegendContent
              nameKey="month"
              renderPayload={(payload, index) => (
                <CharyLegendPayload
                  key={index}
                  payload={payload}
                  // onClick={() => handleLegendClick(payload.dataKey)}
                  className="px-2 py-1 rounded hover:bg-white/20 "
                />
              )}
            />
          )}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}

export default ChartPieLabel
