'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState } from 'react'

type QueryProviderProps = {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tempo em que os dados ficam no cache após não serem mais utilizados
            gcTime: 1000 * 60 * 60 * 24, // 24 horas
            // Tempo até os dados serem considerados "stale" e revalidados
            staleTime: 1000 * 60 * 5, // 5 minutos
            // Número de tentativas em caso de erro
            retry: 2,
            // Não refetch automaticamente quando a janela ganha foco
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
