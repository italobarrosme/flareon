import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Sofa(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/sofa/sofa.glb')
  const sofaNode = nodes.model as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={sofaNode.geometry}
        material={materials.model}
        scale={4}
      >
        <meshStandardMaterial color="#FEE2AD" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/sofa/sofa.glb')
