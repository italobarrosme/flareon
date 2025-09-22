import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { BallCollider } from '@react-three/rapier'
import * as THREE from 'three'

type PointerProps = {
  vec?: THREE.Vector3
}

export function Pointer({ vec = new THREE.Vector3() }: PointerProps) {
  const ref = useRef<any>(null)
  const zPos = useRef(0)
  useFrame(({ mouse, viewport }) =>
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 5,
        (mouse.y * viewport.height) / 5,
        zPos.current
      )
    )
  )

  useEffect(() => {
    const onScroll = (e: WheelEvent) => {
      zPos.current += e.deltaY * -0.01 // zoom no eixo Z
    }
    window.addEventListener('wheel', onScroll)
    return () => window.removeEventListener('wheel', onScroll)
  }, [])

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1]} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="red" wireframe />
      </mesh>
    </RigidBody>
  )
}
