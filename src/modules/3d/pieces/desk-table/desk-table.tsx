import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function DeskTable(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/desk-table/desk-table.glb')
  const deskTableNode = nodes.model as GLTFNode

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={deskTableNode.geometry}
        material={materials.model}
        scale={5}
      >
        <meshStandardMaterial color="#5D688A" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/desk-table/desk-table.glb')
