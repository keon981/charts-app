// import ChartBar from './chart-bar'
// import ChartLineMultiple from './chart-line-multiple'
// import PieChart from './pie-chart'
import { useReducer, useState } from 'react'

import { Checkbox, Flex, Input, Label, Separator } from 'efai-ui-component'
import type { AxisDomainItem } from 'recharts/types/util/types'

import ChartLineMultipleDays from './chart-line-multiple/days'
import ChartCard from '@/components/ui/chart.card'
import { useChartQuery } from '@/serve'

type DomainTuple = [AxisDomainItem, AxisDomainItem]

type Action = {
  type: 'max'
  payload: AxisDomainItem
} | {
  type: 'min'
  payload: AxisDomainItem
}

function domainReducer(state: DomainTuple, action: Action): DomainTuple {
  switch (action.type) {
    case 'max':
      return [state[0], action.payload]
    case 'min':
      return [action.payload, state[1] as AxisDomainItem]
    default:
      return state
  }
}

function RechartsPage() {
  const [allowDataOverflow, setAllowDataOverflow] = useState(false)
  const [spacing, setSpacing] = useState<number | null>(null)
  const [domain, dispatchDomain] = useReducer(domainReducer, ['auto', 'auto'])

  // api
  const { data: chartData, isLoading, isError, error } = useChartQuery()

  const setMinNum = (payload: AxisDomainItem) => dispatchDomain({ type: 'min', payload })
  const setMaxNum = (payload: AxisDomainItem) => dispatchDomain({ type: 'max', payload })

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>錯誤: {error?.message}</div>

  return (
    <div className="max-w-full p-4 grid grid-cols-1 gap-4 ">
      <Flex gap="lg">
        {/* overflow */}
        <Label className="flex gap-2">
          <Checkbox
            checked={allowDataOverflow}
            onCheckedChange={(state) => {
              setAllowDataOverflow(!!state)
            }}
          >
          </Checkbox>
          overflow
        </Label>
        <Separator orientation="vertical" />
        {/* min */}
        <Flex gap="sm">
          <Label>Min</Label>
          <Input onChange={(e) => {
            const { value } = e.target
            if (value === '') {
              setMinNum('auto')
            } else if (Number(value) > 0) {
              setMinNum(Number(value))
            } else {
              setMinNum('dataMin')
            }
          }}
          />
        </Flex>
        <Separator orientation="vertical" />
        {/* max */}
        <Flex gap="sm">
          <Label>Max</Label>
          <Input onChange={(e) => {
            const { value } = e.target
            if (value === '') {
              setMaxNum('auto')
            } else if (Number(value) > 0) {
              setMaxNum(Number(value))
              setAllowDataOverflow(true)
            } else {
              setMaxNum('dataMax')
            }
          }}
          />
        </Flex>

        {/* spacing */}
        <Flex gap="sm">
          <Label>Spacing</Label>
          <Input
            type="number"
            value={spacing || ''}
            onChange={(e) => {
              const { value } = e.target
              setSpacing(value === '' ? null : Number(value))
            }}
          />
        </Flex>
      </Flex>

      {/* Line Days Chart */}
      <ChartCard
        header="Line Chart Days - Multiple"
        actions={['dots', 'label', 'custom dots']}
      >
        <ChartLineMultipleDays domain={domain} allowDataOverflow={allowDataOverflow} data={chartData} spacing={spacing} />
      </ChartCard>

      {/* Line Chart */}
      {/* <ChartCard
        header="Line Chart - Multiple"
        actions={['dots', 'label', 'custom dots']}
      >
        <ChartLineMultiple data={chartData} />
      </ChartCard> */}

      {/* Bar Chart */}
      {/* <ChartCard
        header="Bar Chart - Stacked"
        actions={['all', 'total', 'desktop', 'mobile', 'multiple']}
        defaultSelectValue="all"
      >
        <ChartBar data={areaChartData} />
      </ChartCard> */}

      {/* Pie Chart */}
      {/* <ChartCard
        header="Pie Chart - Label"
        actions={['total', 'desktop', 'mobile']}
        defaultSelectValue="total"
      >
        <PieChart data={areaChartData} />
      </ChartCard> */}
    </div>
  )
}

// export default DefaultPage
export default RechartsPage
