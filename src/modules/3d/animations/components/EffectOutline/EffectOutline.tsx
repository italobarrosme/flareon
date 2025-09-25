'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import {
  EffectComposer,
  Outline,
  Selection,
  // N8AO,
  // TiltShift2,
  ToneMapping,
} from '@react-three/postprocessing'

type EffectOutlineProps = {
  initialPosition: [number, number, number]
  children: React.ReactNode
  disablePointerAnimation?: boolean
  currentBasePosition?: THREE.Vector3
  persistedLookAt?: THREE.Vector3
}

export function EffectOutline({
  initialPosition,
  children,
  disablePointerAnimation = false,
  currentBasePosition,
  persistedLookAt,
}: EffectOutlineProps) {
  const { size } = useThree()
  const basePosition = useRef(new THREE.Vector3(...initialPosition))
  const wasAnimating = useRef(false)
  const sensitivity = { x: 2, y: 1 }
  const damping = 0.3

  // Atualizar a posição base quando a animação terminar
  useEffect(() => {
    if (wasAnimating.current && !disablePointerAnimation) {
      // A animação acabou de terminar, usar a currentBasePosition se disponível
      if (currentBasePosition) {
        basePosition.current.copy(currentBasePosition)
      }
      wasAnimating.current = false
    } else if (disablePointerAnimation) {
      wasAnimating.current = true
    }
  }, [disablePointerAnimation, currentBasePosition, persistedLookAt])

  useFrame((state, delta) => {
    // Só anima com o ponteiro se não estiver desabilitado
    if (!disablePointerAnimation) {
      // Se a animação acabou de terminar, atualizar a posição base
      if (wasAnimating.current) {
        // Usar a currentBasePosition se disponível, senão usar a posição atual
        if (currentBasePosition) {
          basePosition.current.copy(currentBasePosition)
        } else {
          basePosition.current.copy(state.camera.position)
        }
        wasAnimating.current = false
      }

      const { x, y } = state.pointer

      // Só mover e rotacionar se houver movimento do ponteiro
      if (x !== 0 || (y !== 0 && !persistedLookAt)) {
        const targetPosition: [number, number, number] = [
          basePosition.current.x + x * sensitivity.x,
          basePosition.current.y + y * sensitivity.y,
          basePosition.current.z,
        ]

        easing.damp3(state.camera.position, targetPosition, damping, delta)
      } else if (persistedLookAt) {
        // Se não há movimento do ponteiro, manter o lookAt persistido
        state.camera.lookAt(persistedLookAt)
      }
    }
  })

  return (
    <Selection>
      {children}
      <EffectComposer
        enableNormalPass={false}
        autoClear={false}
        multisampling={4}
      >
        <Outline
          visibleEdgeColor={0xffffff}
          hiddenEdgeColor={0x000000}
          blur
          width={size.width * 0.5} // cuidado com width exagerado!
          edgeStrength={10}
        />
        <ToneMapping />
      </EffectComposer>
    </Selection>
  )
}
