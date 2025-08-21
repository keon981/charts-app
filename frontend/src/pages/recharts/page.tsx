// import ChartBar from './chart-bar'
// import ChartLineMultiple from './chart-line-multiple'
// import PieChart from './pie-chart'
import { useState } from 'react'

import { Checkbox, Flex, Input, Label, Separator } from 'efai-ui-component'

import type { MaxType, MinType } from './chart-line-multiple/days'
import ChartLineMultipleDays from './chart-line-multiple/days'
import chartData from '@/__mocks__/chart-data.json'
import ChartCard from '@/components/ui/chart.card'

function RechartsPage() {
  const [allowDataOverflow, setAllowDataOverflow] = useState(false)
  const [minNum, setMinNum] = useState<MinType>('auto')
  const [maxNum, setMaxNum] = useState<MaxType>('auto')
  const domain: [MinType, MaxType] = [minNum, maxNum]

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
            } else {
              setMaxNum('dataMax')
            }
          }}
          />
        </Flex>
      </Flex>

      {/* Line Days Chart */}
      <ChartCard
        header="Line Chart Days - Multiple"
        actions={['dots', 'label', 'custom dots']}
      >
        <ChartLineMultipleDays domain={domain} allowDataOverflow={allowDataOverflow} data={chartData} />
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
