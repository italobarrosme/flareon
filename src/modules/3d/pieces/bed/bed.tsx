import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Bed(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/bed.glb')
  const modelNode = nodes.model as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={modelNode.geometry}
        material={materials.model}
      />
    </group>
  )
}

useGLTF.preload('/bed.glb')
