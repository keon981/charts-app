'use client'

import { useEffect, useState } from 'react'

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
} from '@/components/ui/chart'
import { useChartCard } from '@/components/ui/chart.card'

export const description = 'A pie chart with a label'

interface MonthChartData {
  month: string
  desktop: number
  mobile: number
  total: number
  fill: string
}

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

function PieChartDefault<T extends object>({ data }: Props<T>) {
  const [focusMonth, setFocusMonth] = useState<MonthType | null>(null)
  const { selectValue, page, setPage, setDescription } = useChartCard()

  const monthKeys = Object.keys(data)
  const chartData: Array<MonthChartData> = Object
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

  const handlePieClick = (data: any) => {
    const activeLabel = data.payload.month

    setDescription(`${activeLabel}, 2024`)
    setFocusMonth(activeLabel)
    setPage(2)
  }

  if (page === 2) {
    const monthData = chartData.find(item => item.month === focusMonth) ?? {} as MonthChartData
    return (
      <ChartPieFocus data={monthData} />
    )
  }

  if (selectValue === 'desktop') {
    return (
      <ChartPieLabel data={chartData} dataKey="desktop" onPieClick={handlePieClick} />
    )
  }
  if (selectValue === 'mobile') {
    return (
      <ChartPieLabel data={chartData} dataKey="mobile" onPieClick={handlePieClick} />
    )
  }

  return (
    <ChartPieLabel data={chartData} dataKey="total" onPieClick={handlePieClick} />
  )
}

// Change Select Item(total, desktop, mobile)
function ChartPieLabel({ data, dataKey, onPieClick }: {
  data: MonthChartData[]
  dataKey: string
  onPieClick?: (data: any, index: number, e: React.MouseEvent) => void
}) {
  const [isLabel, setIsLabel] = useState(false)

  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[400px] pb-0"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey={dataKey ?? 'total'}
          label={isLabel}
          nameKey="month"
          onAnimationStart={() => setIsLabel(false)}
          onAnimationEnd={() => setIsLabel(true)}
          onClick={onPieClick}
        />
        <ChartLegend
          content={(<ChartLegendContent nameKey="month" />)}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}

// Focus Month Item
function ChartPieFocus({ data }: Props<MonthChartData>) {
  const [isLabel, setIsLabel] = useState(false)
  const chartData = [
    { name: 'desktop', value: data.desktop, fill: 'var(--chart-1)' },
    { name: 'mobile', value: data.mobile, fill: 'var(--chart-2)' },
  ]

  return (
    <ChartContainer
      config={{
        desktop: {
          label: 'Desktop',
          color: 'var(--chart-1)',
        },
        mobile: {
          label: 'Mobile',
          color: 'var(--chart-2)',
        },
      }}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[400px] pb-0"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartData}
          dataKey="value"
          label={isLabel}
          nameKey="name"
          onAnimationStart={() => setIsLabel(false)}
          onAnimationEnd={() => setIsLabel(true)}
        />
        <ChartLegend
          content={(<ChartLegendContent nameKey="name" />)}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}

export default PieChartDefault
