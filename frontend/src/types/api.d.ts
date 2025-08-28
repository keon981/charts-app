interface DayData {
  date: string
  desktop: number
  mobile: number
}

interface MonthData {
  data: DayData[]
  desktop: number
  mobile: number
  total: number
}

type ChartApiResponse = Record<MonthType, MonthData>
