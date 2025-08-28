import type { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { timeUtils } from '@/lib/utils'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults for all queries
      staleTime: 5 * timeUtils.minute, // 5 minutes
      gcTime: 10 * timeUtils.minute, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof Error && 'status' in error) {
          const status = (error as any).status
          if (status >= 400 && status < 500) {
            return false
          }
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnReconnect: true, // Refetch when reconnecting to the internet
    },
    mutations: {
      // Global defaults for all mutations
      retry: 1,
      retryDelay: 1000,
    },
  },
})

interface QueryProviderProps {
  children: ReactNode
}

const isDevMode = import.meta.env.DEV

/**
 * React Query Provider component
 * Wraps the app with QueryClientProvider and includes dev tools in development
 */
function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show React Query DevTools in development */}
      {isDevMode && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  )
}

// Export the query client for use in other parts of the app if needed
export { queryClient, QueryProvider }
