import { useTexture } from '@react-three/drei'

type RoomAttributes = {
  color: string
  width: number
  height: number
  rotation?: [number, number, number]
  position: [number, number, number]
}

const Floor = () => {
  const textureFloor = useTexture('/effectgranula.png')
  const attributes: RoomAttributes = {
    color: 'gray',
    width: 100,
    height: 100,
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.01, 0],
  }

  return (
    <mesh rotation={attributes.rotation} position={attributes.position}>
      <planeGeometry args={[attributes.width, attributes.height]} />
      <meshStandardMaterial color={attributes.color} envMap={textureFloor} />
    </mesh>
  )
}

const Walls = () => {
  const textureWalls = useTexture('/effectgranula.png')

  const attributes: RoomAttributes = {
    color: 'lightYellow',
    width: 150,
    height: 100,
    position: [0, 0, 0],
  }
  return (
    <mesh rotation={attributes.rotation} position={attributes.position}>
      <planeGeometry args={[attributes.width, attributes.height]} />
      <meshStandardMaterial color={attributes.color} envMap={textureWalls} />
    </mesh>
  )
}

export const Room = () => {
  return (
    <mesh castShadow receiveShadow>
      <Floor />
      <Walls />
    </mesh>
  )
}
