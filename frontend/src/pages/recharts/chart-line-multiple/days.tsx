'use client'

import { useMemo } from 'react'

import { Drama } from 'lucide-react'
import type { Line } from 'recharts'
import type { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart'

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

type DomainType = 'auto' | number
type MinType = 'dataMin' | DomainType
type MaxType = 'dataMax' | DomainType

interface Props<T extends object> {
  data: T
  indicator?: LineIndicatorType
  allowDataOverflow?: boolean
  domain: [MinType, MaxType]
}
type LineProps = Omit<React.ComponentProps<typeof Line>, 'ref'>

function ChartLineMultipleDays<T extends object>({
  data,
  indicator,
  domain,
  allowDataOverflow = false,
}: Props<T>) {
  const { selectValue } = useChartCard()
  const selectValueMemo = useMemo(() => indicator ?? selectValue, [selectValue])

  const filteredData = Object
    .values(data)
    .flatMap((item) => {
      const dates = item.data.map((i, j) => ({ ...i, total: i.desktop + i.mobile }))
      return dates
    })

  const handleLineChartClick: CategoricalChartFunc = (state) => {
    // console.log(state)
  }

  return (
    <LineChartContent
      selectValue={selectValueMemo}
      config={chartConfig}
      data={filteredData}
      xAxisProps={{
        dataKey: 'date',
        hide: true,
        onClick(data, index, event) {
          event.stopPropagation()
          event.preventDefault()
          console.log(data, index, event)
        },
      }}
      yAxisProps={{
        type: 'number',
        domain,
        allowDataOverflow, // 避免被美化
        yAxisId: 'left',
      }}
      lineChartProps={{
        onClick: handleLineChartClick,
      }}
      chartTooltipProps={{
        cursor: { strokeWidth: 2 },
      }}
      lineProps={{
        yAxisId: 'left',
      }}
    />
  )
}

export default ChartLineMultipleDays
export type { LineIndicatorType, LineProps, MaxType, MinType }
