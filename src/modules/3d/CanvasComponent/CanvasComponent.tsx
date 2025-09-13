'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { CameraAnimationWrapper } from '../animations/components'

type CanvasProps = {
  children: React.ReactNode
}

export const CanvasComponent = ({ children }: CanvasProps) => {
  const initialPosition: [number, number, number] = [0, 5, 14]
  const initialLookAt: [number, number, number] = [0, 5, 0]
  return (
    <Canvas
      shadows
      className="w-screen h-screen"
      flat
      dpr={[1, 1.5]} // Reduzir DPR para economizar memória
      gl={{ antialias: false }}
      camera={{
        position: initialPosition,
        fov: 70,
        near: 1,
        far: 80,
      }}
    >
      <color attach="background" args={['#f2f2f5']} />
      <ambientLight intensity={0.7} />
      <Environment preset="sunset" background blur={1} />
      <CameraAnimationWrapper
        initialPosition={initialPosition}
        initialLookAt={initialLookAt}
      >
        {children}
      </CameraAnimationWrapper>
    </Canvas>
  )
}
