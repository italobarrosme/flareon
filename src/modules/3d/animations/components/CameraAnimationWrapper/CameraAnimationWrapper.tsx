'use client'

import React, { createContext, useContext } from 'react'
import * as THREE from 'three'
import { useCameraAnimation } from '../../hooks'
import { EffectOutline } from '../EffectOutline'

type CameraAnimationContextType = {
  animateToTarget: (target: {
    position: [number, number, number]
    lookAt?: [number, number, number]
  }) => void
  resetCamera: () => void
  isAnimating: boolean
  currentBasePosition: THREE.Vector3
  persistedLookAt: THREE.Vector3
}

const CameraAnimationContext = createContext<CameraAnimationContextType | null>(
  null
)

export const useCameraAnimationContext = () => {
  const context = useContext(CameraAnimationContext)
  if (!context) {
    throw new Error(
      'useCameraAnimationContext must be used within CameraAnimationWrapper'
    )
  }
  return context
}

type CameraAnimationWrapperProps = {
  initialPosition: [number, number, number]
  initialLookAt: [number, number, number]
  children: React.ReactNode
}

export const CameraAnimationWrapper = ({
  initialPosition,
  initialLookAt,
  children,
}: CameraAnimationWrapperProps) => {
  const cameraAnimation = useCameraAnimation(initialPosition, initialLookAt)

  return (
    <CameraAnimationContext.Provider value={cameraAnimation}>
      <EffectOutline
        initialPosition={initialPosition}
        disablePointerAnimation={cameraAnimation.isAnimating}
        currentBasePosition={cameraAnimation.currentBasePosition}
        persistedLookAt={cameraAnimation.persistedLookAt}
      >
        {children}
      </EffectOutline>
    </CameraAnimationContext.Provider>
  )
}
