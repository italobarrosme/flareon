import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Closet(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/closet/closet.glb')
  const closetNode = nodes.model as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={closetNode.geometry}
        material={materials.model}
        scale={4}
      >
        <meshStandardMaterial color="#B87C4C" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/closet/closet.glb')
