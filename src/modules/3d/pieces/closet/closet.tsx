import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Closet(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/closet.glb')
  const closetNode = nodes.closet as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={closetNode.geometry}
        material={materials.closet}
      />
    </group>
  )
}

useGLTF.preload('/closet.glb')
