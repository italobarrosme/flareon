type LoadingProgressProps = {
  loaded: number
  total: number
  isLoadingGradually: boolean
}

export function LoadingProgress({
  loaded,
  total,
  isLoadingGradually,
}: LoadingProgressProps) {
  if (total === 0) return null

  const percentage = Math.round((loaded / total) * 100)

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium">
          Games: {loaded}/{total}
        </div>
        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-300">{percentage}%</div>
        {isLoadingGradually && (
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-100" />
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-200" />
          </div>
        )}
      </div>
    </div>
  )
}
