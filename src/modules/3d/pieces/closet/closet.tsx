import React from 'react'
import { useGLTF } from '@react-three/drei'

interface ClosetProps {
  [key: string]: any
}

export function Closet(props: ClosetProps) {
  const { nodes, materials } = useGLTF('/closet.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.closet as any).geometry}
        material={materials.closet}
      />
    </group>
  )
}

useGLTF.preload('/closet.glb')
