'use client'

import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useEffect, useRef } from 'react'

export const CameraLogger = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null!)
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return

    const controls = controlsRef.current

    // Log inicial das posições
    console.log('🎥 OrbitControls Inicializado')
    console.log('📍 Posição inicial da câmera:', camera.position)
    console.log('🎯 Target inicial:', controls.target)

    // Eventos para monitorar mudanças
    const onChangeStart = () => {
      console.log('🚀 OrbitControls: Movimento iniciado')
    }

    const onChange = () => {
      console.log('📹 Câmera - Posição:', {
        x: camera.position.x.toFixed(3),
        y: camera.position.y.toFixed(3),
        z: camera.position.z.toFixed(3),
      })
      console.log('🎯 Target:', {
        x: controls.target.x.toFixed(3),
        y: controls.target.y.toFixed(3),
        z: controls.target.z.toFixed(3),
      })
      console.log(
        '📐 Distância da câmera ao target:',
        camera.position.distanceTo(controls.target).toFixed(3)
      )
    }

    const onChangeEnd = () => {
      console.log('⏹️ OrbitControls: Movimento finalizado')
      console.log('📊 Estado final:')
      console.log('  - Câmera:', camera.position)
      console.log('  - Target:', controls.target)
      console.log('  - Zoom:', camera.zoom)
    }

    // Adicionar listeners
    controls.addEventListener('start', onChangeStart)
    controls.addEventListener('change', onChange)
    controls.addEventListener('end', onChangeEnd)

    // Cleanup
    return () => {
      controls.removeEventListener('start', onChangeStart)
      controls.removeEventListener('change', onChange)
      controls.removeEventListener('end', onChangeEnd)
    }
  }, [camera])

  return <OrbitControls ref={controlsRef} />
}
