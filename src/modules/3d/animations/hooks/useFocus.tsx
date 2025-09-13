import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'
import { useRef, useCallback, useEffect } from 'react'

export function useFocus(controlsRef: React.RefObject<any>) {
  const { camera, invalidate } = useThree()
  const isAnimating = useRef(false)

  // 🔑 mantém R3F em sincronia com qualquer animação GSAP
  useEffect(() => {
    const tick = () => invalidate()
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [invalidate])

  const focusOn = useCallback(
    (mesh: THREE.Object3D, distance: number = 10) => {
      if (!mesh) return
      if (isAnimating.current) return

      const target = new THREE.Vector3()
      mesh.getWorldPosition(target)

      // calcula posição da câmera afastada
      const dir = new THREE.Vector3()
        .subVectors(camera.position, target)
        .normalize()
        .multiplyScalar(distance)

      const newPos = target.clone().add(dir)

      isAnimating.current = true

      gsap.to(camera.position, {
        duration: 2,
        x: newPos.x,
        y: newPos.y,
        z: newPos.z,
        ease: 'power2.inOut',
        onStart: () => {
          if (controlsRef.current) controlsRef.current.enabled = false
        },
        onUpdate: () => {
          camera.lookAt(target)
          if (controlsRef.current) controlsRef.current.update()
        },
        onComplete: () => {
          if (controlsRef.current) {
            controlsRef.current.target.copy(target)
            controlsRef.current.enabled = true
            controlsRef.current.update()
          }
          isAnimating.current = false
        },
      })
    },
    [camera, controlsRef]
  )

  return focusOn
}
