import { useRef } from 'react'
import { easing } from 'maath'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

export function DirectLight() {
  const ref = useRef<Group>(null)
  useFrame((state, delta) => {
    if (ref.current?.rotation) {
      easing.dampE(
        ref.current.rotation,
        [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0],
        0.2,
        delta
      )
    }
  })
  return (
    <group ref={ref}>
      <directionalLight
        position={[8, 12, 6]}
        castShadow
        intensity={4}
        shadow-mapSize={2048}
        shadow-bias={-0.0001}
      >
        <OrthographicCamera
          attach="shadow-camera"
          args={[-12, 12, 12, -12, 0.1, 25]}
        />
      </directionalLight>
    </group>
  )
}
