import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Sofa(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/sofa.glb')
  const sofaNode = nodes.sofa as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={sofaNode.geometry}
        material={materials.sofa}
      />
    </group>
  )
}

useGLTF.preload('/sofa.glb')
