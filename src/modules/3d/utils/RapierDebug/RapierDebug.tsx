import { useRapier } from '@react-three/rapier'
import { useEffect } from 'react'

export function RapierDebug() {
  const { world, rapier } = useRapier()

  useEffect(() => {
    const debugRender = new rapier.DebugRenderPipeline()
    world.debugRender = () => debugRender
    return () => {
      world.debugRender = () => undefined as any
    }
  }, [world, rapier])

  return null
}
