'use client'

import { useMemo } from 'react'

import { Drama } from 'lucide-react'
import type { Line } from 'recharts'

import LineChartContent from './content'
import type {
  ChartConfig,
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

function ChartLineMultipleDays<T extends object>({ data, indicator }: Props<T>) {
  const { selectValue } = useChartCard()
  const selectValueMemo = useMemo(() => indicator ?? selectValue, [selectValue])

  const filteredData = Object
    .values(data)
    .flatMap((item) => {
      const dates = item.data.map((i, j) => ({ ...i, total: i.desktop + i.mobile }))
      return dates
    })

  return (
    <LineChartContent
      selectValue={selectValueMemo}
      config={chartConfig}
      data={filteredData}
      xAxisProps={{
        dataKey: 'date',
        hide: true,
      }}
    />
  )
}

export default ChartLineMultipleDays
export type { LineIndicatorType, LineProps }
