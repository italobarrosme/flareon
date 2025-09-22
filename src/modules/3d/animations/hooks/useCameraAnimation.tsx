import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'

type CameraTarget = {
  position: [number, number, number]
  lookAt?: [number, number, number]
}

export const useCameraAnimation = (
  initialPosition: [number, number, number],
  initialLookAt: [number, number, number]
) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const targetPosition = useRef(new THREE.Vector3(...initialPosition))
  const currentBasePosition = useRef(new THREE.Vector3(...initialPosition))
  const persistedLookAt = useRef(new THREE.Vector3(...initialLookAt))

  const animateToTarget = (target: CameraTarget) => {
    targetPosition.current.set(...target.position)
    if (target.lookAt) {
      persistedLookAt.current.set(...target.lookAt)
    }
    setIsAnimating(true)
  }

  const resetCamera = () => {
    targetPosition.current.set(...initialPosition)
    persistedLookAt.current.set(0, 5, 0)
    currentBasePosition.current.set(...initialPosition)
    setIsAnimating(true)
  }

  useFrame((state, delta) => {
    if (isAnimating) {
      // Animar posição da câmera
      easing.damp3(state.camera.position, targetPosition.current, 0.4, delta)

      // Calcular direção do lookAt
      const targetDirection = persistedLookAt.current
        .clone()
        .sub(state.camera.position)
        .normalize()

      // Criar quaternion para essa direção
      const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, -1), // Direção padrão da câmera
        targetDirection
      )

      // Animar para essa rotação
      easing.dampQ(state.camera.quaternion, targetQuaternion, 0.4, delta)

      // Verificar se a animação está completa (posição E rotação)
      const positionDistance = state.camera.position.distanceTo(
        targetPosition.current
      )

      if (positionDistance < 0.1) {
        // Forçar a câmera para a posição final exata
        state.camera.position.copy(targetPosition.current)

        // Forçar o lookAt final exato
        state.camera.lookAt(persistedLookAt.current)

        // PERSISTIR o lookAt para uso futuro
        persistedLookAt.current.copy(targetQuaternion)

        // Atualizar a posição base quando a animação terminar
        currentBasePosition.current.copy(targetPosition.current)
        setIsAnimating(false)
      }
    }
  })

  return {
    animateToTarget,
    resetCamera,
    isAnimating,
    currentBasePosition: currentBasePosition.current,
    persistedLookAt: persistedLookAt.current,
  }
}
