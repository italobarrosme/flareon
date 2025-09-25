import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Bed(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/bed/bed.glb')
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
        <meshStandardMaterial color="#6D94C5" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/bed/bed.glb')
