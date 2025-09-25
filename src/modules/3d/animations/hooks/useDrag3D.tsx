import { useState, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'
import { projectToWorld } from '../utils/projectToWorld'

type UseDrag3DProps = {
  mode?: 'xy' | 'xz' | 'yz' | 'free'
  fixed?: number
  onDrag?: (pos: THREE.Vector3) => void
  getInitial?: () => THREE.Vector3 // opcional: pega posição inicial de fora (ex: RigidBody.translation())
  strength?: number
  canDrag?: boolean
}

export const useDrag3D = ({
  mode = 'xy',
  fixed = 0,
  onDrag,
  getInitial,
  strength = 5,
  canDrag = true,
}: UseDrag3DProps) => {
  const { camera, size } = useThree()
  const [position, setPosition] = useState(new THREE.Vector3())

  const startPos = useRef<THREE.Vector3 | null>(null)
  const startWorld = useRef<THREE.Vector3 | null>(null)

  const bind = useDrag(({ down, xy: [x, y], first }) => {
    if (!canDrag) return
    document.body.style.cursor = down ? 'grabbing' : 'grab'

    const worldPos = projectToWorld({
      x,
      y,
      camera,
      size,
      mode,
      fixed,
    })

    if (first) {
      // Posição inicial do objeto (RigidBody ou mesh)
      startPos.current = getInitial ? getInitial() : position.clone()
      // Posição inicial do mouse em mundo
      startWorld.current = worldPos.clone()
    }

    if (down && startPos.current && startWorld.current) {
      // Delta do movimento do mouse
      const delta = worldPos
        .clone()
        .sub(startWorld.current)
        .multiplyScalar(strength)
      // Nova posição = posição inicial do objeto + delta
      const newPos = startPos.current.clone().add(delta)

      setPosition(newPos)
      onDrag?.(newPos)
    }
  })

  return { position, bind }
}
