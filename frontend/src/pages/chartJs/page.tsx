import React from 'react'

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import chartData from '@/__mocks__/chart-data.json'

// 註冊需要的元件 (不註冊會報錯)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

interface Props {}

function ChartJsPage(props: Props) {
  const datesChartData = Object.values(chartData).flatMap(
    (item) => {
      const dates = item.data.map(i => ({
        ...i,
        // ...area,
        total: i.desktop + i.mobile,
      }))
      return dates
    },
  )

  const data = {
    labels: datesChartData.map(i => i.date),
    datasets: [
      {
        label: '',
        data: datesChartData.map(i => i.mobile),
        borderColor: 'oklch(0.6 0.118 184.704)',
        backgroundColor: 'rgba(229, 6, 6, 0)',
      },
    ],
  }

  return (
    <div className="min-h-[250px]">
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: 'index', // index: 同 x 軸顯示多組 dataset
              intersect: false, // 是否一定要滑到點上才顯示
            },
          },
        }}
      />
    </div>
  )
}

export default ChartJsPage
