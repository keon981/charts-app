import { useState } from 'react'

import { Button } from 'efai-ui-component'
import { Link } from 'react-router'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import Logo from '@/assets/logo/big-logo.svg'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80, data: {
    desktop: [
      { name: 'Desktop 1', value: 62 },
      { name: 'Desktop 2', value: 50 },
      { name: 'Desktop 3', value: 74 },
    ],
    mobile: [
      { name: 'Mobile 1', value: 20 },
      { name: 'Mobile 2', value: 30 },
      { name: 'Mobile 3', value: 30 },
    ],
  } },
  { month: 'February', desktop: 305, mobile: 200, data: {
    desktop: [
      { name: 'Desktop 1', value: 77 },
      { name: 'Desktop 2', value: 90 },
      { name: 'Desktop 3', value: 138 },
    ],
    mobile: [
      { name: 'Mobile 1', value: 50 },
      { name: 'Mobile 2', value: 60 },
      { name: 'Mobile 3', value: 90 },
    ],
  } },
  { month: 'March', desktop: 237, mobile: 120, data: {
    desktop: [
      { name: 'Desktop 1', value: 13 },
      { name: 'Desktop 2', value: 155 },
      { name: 'Desktop 3', value: 69 },
    ],
    mobile: [
      { name: 'Mobile 1', value: 30 },
      { name: 'Mobile 2', value: 40 },
      { name: 'Mobile 3', value: 50 },
    ],
  } },
  { month: 'April', desktop: 73, mobile: 190, data: {
    desktop: [
      { name: 'Desktop 1', value: 12 },
      { name: 'Desktop 2', value: 55 },
      { name: 'Desktop 3', value: 6 },
    ],
    mobile: [
      { name: 'Mobile 1', value: 100 },
      { name: 'Mobile 2', value: 26 },
      { name: 'Mobile 3', value: 64 },
    ],
  } },
  { month: 'May', desktop: 209, mobile: 130, data: {
    desktop: [
      { name: 'Desktop 1', value: 9 },
      { name: 'Desktop 2', value: 88 },
      { name: 'Desktop 3', value: 112 },
    ],
    mobile: [
      { name: 'Mobile 1', value: 30 },
      { name: 'Mobile 2', value: 40 },
      { name: 'Mobile 3', value: 60 },
    ],
  } },
  { month: 'June', desktop: 214, mobile: 140, data: {
    desktop: [
      { name: 'Desktop 1', value: 67 },
      { name: 'Desktop 2', value: 31 },
      { name: 'Desktop 3', value: 116 },
    ],
    mobile: [
      { name: 'Mobile 1', value: 50 },
      { name: 'Mobile 2', value: 60 },
      { name: 'Mobile 3', value: 30 },
    ],
  } },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
  month: {
    label: 'Month',
  },
}

const detailChartConfig = {
  value: {
    label: 'Value',
    color: '#8884d8',
  },
  name: {
    label: 'Name',
  },
}

function RechartsPage() {
  const [count, setCount] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<'desktop' | 'mobile' | null>(null)
  const [showDetailChart, setShowDetailChart] = useState(false)

  const value = (count % 2) === 1
    ? 'ODD'
    : 'Even'

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

  return (
    <>
      <hgroup className="flex justify-center items-center">
        <i>
          <Link
            to="https://www.everfortuneai.com.tw/zh/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={Logo} className="logo" alt="EFAI logo" />
          </Link>
        </i>
        <h1 className="text-5xl font-bold">EFAI</h1>
      </hgroup>

      <div className="card">
        <p>Count: {count}</p>
        <Button type="button" onClick={() => setCount(count => count + 1)}>
          {value}
        </Button>
      </div>

      {!showDetailChart
        ? (
          // 主圖表
            <div>
              <h2 className="text-2xl font-bold mb-4">月度總覽</h2>
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
                    fill="var(--color-chart-1)"
                    radius={4}
                    onClick={handleDesktopBarClick}
                    style={{ cursor: 'pointer' }}
                  />
                  <Bar
                    dataKey="mobile"
                    fill="var(--color-chart-2)"
                    radius={4}
                    onClick={handleMobileBarClick}
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
                <Button
                  onClick={handleBackToMain}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  ← 返回總覽
                </Button>
                <h2 className="text-2xl font-bold">
                  {selectedMonth} - {selectedType === 'desktop' ? '桌面' : '行動裝置'} 詳細資料
                </h2>
              </div>

              <ChartContainer config={detailChartConfig} className="min-h-[300px] w-85%">
                <BarChart data={getDetailData()}>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={20}
                    axisLine={false}
                  />
                  <YAxis />
                  <Bar
                    dataKey="value"
                    fill={selectedType === 'desktop' ? 'var(--color-chart-1)' : 'var(--color-chart-2)'}
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

export default RechartsPage
