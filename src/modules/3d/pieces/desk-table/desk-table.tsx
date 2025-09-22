import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function DeskTable(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/desk-table.glb')
  const deskTableNode = nodes['desk-table'] as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={deskTableNode.geometry}
        material={materials['desk-table']}
      />
    </group>
  )
}

useGLTF.preload('/desk-table.glb')
