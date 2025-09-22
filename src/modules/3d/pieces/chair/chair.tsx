import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Chair(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/chair.glb')
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

useGLTF.preload('/chair.glb')
