import React from 'react'
import { useGLTF } from '@react-three/drei'

interface BedProps {
  [key: string]: any
}

export function Bed(props: BedProps) {
  const { nodes, materials } = useGLTF('/bed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.model as any).geometry}
        material={materials.model}
      />
    </group>
  )
}

useGLTF.preload('/bed.glb')
