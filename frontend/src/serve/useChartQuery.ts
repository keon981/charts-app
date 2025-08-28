import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { timeUtils } from '@/lib/utils'

const apiBase = import.meta.env.VITE_API_BASE_URL

// Fetch chart data from backend /data endpoint
async function getChartData(): Promise<any> {
  const response = await axios.get(`${apiBase}/data`)
  return response.data
}

// Hook to fetch chart data from /data endpoint
export function useChartQuery(
  options?: Omit<UseQueryOptions<any, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: ['chart', 'data'],
    queryFn: () => getChartData(),
    staleTime: 5 * timeUtils.minute,
    gcTime: 10 * timeUtils.minute,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  })
}
