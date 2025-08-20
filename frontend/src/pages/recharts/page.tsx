import ChartBar from './chart-bar'
import ChartLineMultiple from './chart-line-multiple'
import PieChart from './pie-chart'
import chartData from '@/__mocks__/chart-data.json'
import ChartCard from '@/components/ui/chart.card'

function RechartsPage() {
  return (
    <div className="max-w-full p-4 grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 ">

      {/* Line Chart */}
      <ChartCard
        header="Line Chart - Multiple"
        actions={['dots', 'label', 'custom dots']}
      >
        <ChartLineMultiple data={chartData} />
      </ChartCard>

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
