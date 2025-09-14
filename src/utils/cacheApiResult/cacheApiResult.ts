// types.ts
export type ApiResponse<T> = {
  data: T[]
  total: number
  lastUpdated: Date
}

// cache.ts
const responseCache = new Map<string, unknown>()

export function setCache<T>(key: string, data: T[]): void {
  responseCache.set(key, {
    data,
    total: data.length,
    lastUpdated: new Date(),
  } satisfies ApiResponse<T>)
}

export function getCache<T>(key: string): ApiResponse<T> | null {
  return (responseCache.get(key) as ApiResponse<T>) ?? null
}

export function clearCache(key?: string): void {
  if (key) {
    responseCache.delete(key)
  } else {
    responseCache.clear()
  }
}
