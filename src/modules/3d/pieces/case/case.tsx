import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Case(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/case.glb')
  const caseNode = nodes.case as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={caseNode.geometry}
        material={materials.case}
      />
    </group>
  )
}

useGLTF.preload('/case.glb')
