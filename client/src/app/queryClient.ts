import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '../error/ApiError.ts'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status === 404) && failureCount < 2,
    },
  },
})
