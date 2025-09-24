import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function DeskTable(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/desk-table/desk-table.glb')
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

useGLTF.preload('/desk-table/desk-table.glb')
