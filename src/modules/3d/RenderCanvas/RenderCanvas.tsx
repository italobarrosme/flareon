'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
// import { CameraAnimationWrapper } from '../animations/components'

type RenderCanvasProps = {
  children: React.ReactNode
}

export const RenderCanvas = ({ children }: RenderCanvasProps) => {
  const initialPosition: [number, number, number] = [-3, 13, 8]
  // const initialLookAt: [number, number, number] = [0, 3, 15]
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      {/* <CameraAnimationWrapper
        initialPosition={initialPosition}
        initialLookAt={initialLookAt}
      >
      </CameraAnimationWrapper> */}
      {children}
      <OrbitControls />
    </Canvas>
  )
}
