'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

type RenderCanvasProps = {
  children: React.ReactNode
}

export const RenderCanvas = ({ children }: RenderCanvasProps) => {
  const initialPosition: [number, number, number] = [-9, 22, 40]
  const initialLookAt: [number, number, number] = [-3, 15, 10]
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
      <color attach="background" args={['#5f27cd']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      {children}
      <OrbitControls
        position0={initialPosition}
        target0={initialLookAt}
        enableDamping={false}
        dampingFactor={0.05}
        // enableZoom={false}
        // enableRotate={false}
        // enablePan={false}
      />
    </Canvas>
  )
}
