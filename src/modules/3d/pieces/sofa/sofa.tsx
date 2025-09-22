import React from 'react'
import { useGLTF } from '@react-three/drei'

interface SofaProps {
  [key: string]: any
}

export function Sofa(props: SofaProps) {
  const { nodes, materials } = useGLTF('/sofa.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.sofa as any).geometry}
        material={materials.sofa}
      />
    </group>
  )
}

useGLTF.preload('/sofa.glb')
