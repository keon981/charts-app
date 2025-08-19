import ChartBar from './chart-bar'
import ChartLineMultiple from './chart-line-multiple'
import PieChart from './pie-chart'
import areaChartData from '@/__mocks__/area-chart-data.json'
import ChartCard from '@/components/ui/chart.card'

function RechartsPage() {
  return (
    <div className="p-4 grid 2xl:grid-cols-3 grid-cols-2 gap-4">

      {/* Line Chart */}
      <ChartCard
        header="Line Chart - Multiple"
        actions={['dots', 'label', 'custom dots']}
      >
        <ChartLineMultiple data={areaChartData} />
      </ChartCard>

      {/* Bar Chart */}
      <ChartCard
        header="Bar Chart - Stacked"
        actions={['all', 'total', 'desktop', 'mobile', 'multiple']}
        defaultSelectValue="all"
      >
        <ChartBar data={areaChartData} />
      </ChartCard>

      {/* Pie Chart */}
      <ChartCard
        header="Pie Chart - Label"
        actions={['total', 'desktop', 'mobile']}
        defaultSelectValue="total"
      >
        <PieChart data={areaChartData} />
      </ChartCard>
    </div>
  )
}

// export default DefaultPage
export default RechartsPage
