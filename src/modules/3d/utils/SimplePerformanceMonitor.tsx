'use client'

import { useEffect, useState } from 'react'

type SimpleStats = {
  fps: number
  timestamp: number
}

export const SimplePerformanceMonitor = () => {
  const [stats, setStats] = useState<SimpleStats>({
    fps: 0,
    timestamp: Date.now(),
  })
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = Date.now()
    let animationId: number

    const updateStats = () => {
      frameCount++
      const currentTime = Date.now()

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount
        frameCount = 0
        lastTime = currentTime

        setStats({ fps, timestamp: currentTime })
        setShowWarning(fps < 20)
      }

      animationId = requestAnimationFrame(updateStats)
    }

    animationId = requestAnimationFrame(updateStats)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  // Só mostrar em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: showWarning ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        border: showWarning ? '2px solid red' : '1px solid #ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        fontFamily: 'monospace',
        color: showWarning ? 'red' : '#333',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
        minWidth: 150,
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
        📊 Performance {showWarning && '⚠️'}
      </div>
      <div>FPS: {stats.fps}</div>
      <div>WebGL: ✅</div>

      {showWarning && (
        <div
          style={{
            marginTop: 8,
            fontSize: 10,
            color: 'red',
            fontWeight: 'bold',
          }}
        >
          ⚠️ FPS baixo!
        </div>
      )}
    </div>
  )
}
