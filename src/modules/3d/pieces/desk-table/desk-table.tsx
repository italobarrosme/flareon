import React from 'react'
import { useGLTF } from '@react-three/drei'

interface DeskTableProps {
  [key: string]: any
}

export function DeskTable(props: DeskTableProps) {
  const { nodes, materials } = useGLTF('/desk-table.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes['desk-table'] as any).geometry}
        material={materials['desk-table']}
      />
    </group>
  )
}

useGLTF.preload('/desk-table.glb')
