import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Case(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/case/case.glb')
  const caseNode = nodes.model as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={caseNode.geometry}
        material={materials.model}
        scale={1}
      >
        <meshStandardMaterial color="#5D688A" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/case/case.glb')
