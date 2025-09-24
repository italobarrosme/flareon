import { useGLTF } from '@react-three/drei'
import { GLTFNode, FurnitureProps } from '../../types/gltf-types'

export function Dog(props: FurnitureProps) {
  const { nodes, materials } = useGLTF('/dog/dog.glb')
  const modelNode = nodes.model as GLTFNode
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={modelNode.geometry}
        material={materials.model}
        material-envMap={'city'}
      >
        <meshStandardMaterial color="#FEE2AD" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/dog/dog.glb')
