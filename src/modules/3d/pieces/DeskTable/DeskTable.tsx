import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function DeskTable(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/desk-table/desk-table.glb')
  const deskTableNode = nodes.model as GLTFNode

  return (
    <RigidBody type="fixed" colliders="hull" {...props}>
      <group dispose={null}>
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
    </RigidBody>
  )
}

useGLTF.preload('/desk-table/desk-table.glb')
