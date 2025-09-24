import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Chair(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/chair/chair.glb')
  const modelNode = nodes.model as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={modelNode.geometry}
        material={materials.model}
        scale={4}
      >
        <meshStandardMaterial color="#E8DFCA" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/chair.glb')
