import { useState } from 'react'

import { Button } from 'efai-ui-component'
import { Link } from 'react-router'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import Logo from '@/assets/logo/big-logo.svg'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
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

function FrontPage() {
  const [count, setCount] = useState(0)

  const value = (count % 2) === 1
    ? 'ODD'
    : 'Even'

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
      <ChartContainer config={chartConfig} className="min-h-[200px] w-85%">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={20}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <Bar dataKey="desktop" fill="var(--color-chart-1)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-chart-2)" radius={4} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <CartesianGrid vertical={false} />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </>
  )
}

export default FrontPage
