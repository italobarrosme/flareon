'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type PerformanceStats = {
  fps: number
  drawCalls: number
  triangles: number
  geometries: number
  textures: number
  memoryUsage: string
}

export const PerformanceMonitor = () => {
  const { gl } = useThree()
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 0,
    drawCalls: 0,
    triangles: 0,
    geometries: 0,
    textures: 0,
    memoryUsage: '0 MB',
  })

  const frameCount = useRef(0)
  const lastTime = useRef(Date.now())
  const [showWarning, setShowWarning] = useState(false)

  useFrame(() => {
    frameCount.current++
    const currentTime = Date.now()

    // Calcular FPS a cada segundo
    if (currentTime - lastTime.current >= 1000) {
      const fps = frameCount.current
      frameCount.current = 0
      lastTime.current = currentTime

      // Obter estatísticas de render
      const info = gl.info
      const memory = info.memory || {}
      const render = info.render || {}

      // Estimar uso de memória (aproximação)
      const estimatedMemory = (
        (memory.geometries || 0) * 0.1 +
        (memory.textures || 0) * 0.5 +
        (render.triangles || 0) * 0.001
      ).toFixed(1)

      const newStats = {
        fps,
        drawCalls: render.calls || 0,
        triangles: render.triangles || 0,
        geometries: memory.geometries || 0,
        textures: memory.textures || 0,
        memoryUsage: `${estimatedMemory} MB`,
      }

      setStats(newStats)

      // Verificar limites críticos
      const isCritical =
        fps < 15 ||
        newStats.geometries > 200 ||
        newStats.textures > 100 ||
        newStats.drawCalls > 500

      setShowWarning(isCritical)

      if (isCritical) {
        console.warn('⚠️ Performance crítica detectada:', newStats)
        console.warn('Considere reduzir a quantidade de objetos 3D')
      }
    }
  })

  useEffect(() => {
    // Resetar info do renderer periodicamente para evitar acúmulo
    const resetInterval = setInterval(() => {
      gl.info.reset()
    }, 5000)

    return () => clearInterval(resetInterval)
  }, [gl])

  // Só mostrar em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  // Renderizar usando portal para que funcione dentro do Canvas
  return createPortal(
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
        minWidth: 200,
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
        🔍 Performance Monitor {showWarning && '⚠️'}
      </div>
      <div>FPS: {stats.fps}</div>
      <div>Draw Calls: {stats.drawCalls}</div>
      <div>Triangles: {stats.triangles.toLocaleString()}</div>
      <div>Geometries: {stats.geometries}</div>
      <div>Textures: {stats.textures}</div>
      <div>Memory: {stats.memoryUsage}</div>

      {showWarning && (
        <div
          style={{
            marginTop: 8,
            fontSize: 10,
            color: 'red',
            fontWeight: 'bold',
          }}
        >
          ⚠️ Performance crítica!
          <br />
          Reduza objetos 3D
        </div>
      )}
    </div>,
    document.body
  )
}
