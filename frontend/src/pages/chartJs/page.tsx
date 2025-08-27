import { useMemo } from 'react'

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
import annotationPlugin from 'chartjs-plugin-annotation'
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
  const datesChartData = useMemo(() => {
    return Object.values(chartData).flatMap(item =>
      item.data.map(i => ({ ...i, total: i.desktop + i.mobile })),
    )
  }, [])

  const data = useMemo(() => ({
    labels: datesChartData.map(i => i.date),
    datasets: [
      {
        fill: true,
        label: '',
        data: datesChartData.map(i => i.mobile),
        borderColor: 'oklch(0.6 0.118 184.704)',
        backgroundColor: 'rgba(229, 6, 6, .5)',
        pointRadius: 0,
      },
    ],
  }), [datesChartData])

  return (
    <div className="min-h-[250px]">
      <Line
        data={data}
        options={{
          responsive: true,
          scales: {
            y: { min: 0, max: 550 },
          },
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index' as const, intersect: false },
          },
        }}
        plugins={[annotationPlugin]}
        redraw
      />
    </div>
  )
}

export default ChartJsPage
