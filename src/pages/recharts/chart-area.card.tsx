import ChartAreaInteractive from './chart-area-interactive'
import areaChartData from '@/__mocks__/area-chart-data.json'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {}

// eslint-disable-next-line unused-imports/no-unused-vars
function ChartAreaCard(props: Props) {
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-4 px-2 sm:px-6 sm:mt-6 min-h-[250px]">
        <ChartAreaInteractive data={areaChartData} />
      </CardContent>
    </Card>
  )
}

export default ChartAreaCard
