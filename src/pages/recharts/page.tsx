import { useState } from 'react'

import { Button } from 'efai-ui-component'
import { ChevronLeft } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import ChartAreaDefault from './chart-area-default.card'
import ChartAreaInteractive from './chart-area-interactive'
import chartData from '@/__mocks__/chart-data.json'
import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--color-chart-2)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--color-chart-5)',
  },
} satisfies ChartConfig<'desktop' | 'mobile'>

const detailChartConfig = {
  value: {
    label: 'Value',
    color: '#8884d8',
  },
  name: {
    label: 'Name',
  },
} satisfies ChartConfig<'value' | 'name'>

// eslint-disable-next-line unused-imports/no-unused-vars
function DefaultPage() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<'desktop' | 'mobile' | null>(null)
  const [showDetailChart, setShowDetailChart] = useState(false)

  // 處理桌面柱狀圖點擊事件
  const handleDesktopBarClick = (data: any, _index: number) => {
    if (data && data.payload) {
      const monthData = chartData.find(item => item.month === data.payload.month)
      if (monthData) {
        setSelectedMonth(data.payload.month)
        setSelectedType('desktop')
        setShowDetailChart(true)
      }
    }
  }

  // 處理行動裝置柱狀圖點擊事件
  const handleMobileBarClick = (data: any, _index: number) => {
    if (data && data.payload) {
      const monthData = chartData.find(item => item.month === data.payload.month)
      if (monthData) {
        setSelectedMonth(data.payload.month)
        setSelectedType('mobile')
        setShowDetailChart(true)
      }
    }
  }

  // 返回主圖表
  const handleBackToMain = () => {
    setShowDetailChart(false)
    setSelectedMonth(null)
    setSelectedType(null)
  }

  // 獲取詳細資料
  const getDetailData = () => {
    if (!selectedMonth || !selectedType) return []

    const monthData = chartData.find(item => item.month === selectedMonth)
    if (!monthData || !monthData.data) return []

    return monthData.data[selectedType] || []
  }

  const detailsTitle = `${selectedMonth} - ${selectedType === 'desktop' ? '桌面' : '行動裝置'} 詳細資料`

  return (
    <>
      <hgroup className="flex justify-center items-center pt-4 mb-8">
        <h1 className="text-5xl font-bold">{showDetailChart ? detailsTitle : '月度總覽'}</h1>
      </hgroup>

      {!showDetailChart
        ? (
          // 主圖表
            <div>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-85%">
                <BarChart accessibilityLayer data={chartData}>
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={20}
                    axisLine={false}
                    tickFormatter={value => value.slice(0, 3)}
                  />
                  <Bar
                    dataKey="desktop"
                    radius={4}
                    onClick={handleDesktopBarClick}
                    fill="var(--color-desktop)"
                    style={{ cursor: 'pointer' }}
                  />
                  <Bar
                    dataKey="mobile"
                    radius={4}
                    onClick={handleMobileBarClick}
                    fill="var(--color-mobile)"
                    style={{ cursor: 'pointer' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <CartesianGrid vertical={false} />
                  <ChartLegend content={<ChartLegendContent />} />
                </BarChart>
              </ChartContainer>
              <p className="text-sm text-gray-600 mt-2">
                點擊任一柱狀圖查看詳細資料
              </p>
            </div>
          )
        : (
          // 詳細圖表
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Button variant="ghost" onClick={handleBackToMain}>
                  <ChevronLeft /> 返回總覽
                </Button>
              </div>

              <ChartContainer config={detailChartConfig} className="min-h-[300px] w-85%">
                <BarChart data={getDetailData()}>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={20}
                    axisLine={false}
                  />
                  {/* <YAxis /> */}
                  <Bar
                    dataKey="value"
                    fill={chartConfig[selectedType as keyof typeof chartConfig].color}
                    radius={4}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <CartesianGrid vertical={false} />
                </BarChart>
              </ChartContainer>
            </div>
          )}
    </>
  )
}

function RechartsPage() {
  return (
    <div className="p-4">
      <ChartAreaInteractive />
    </div>
  )
}

// export default DefaultPage
export default RechartsPage
