import { TextureLoader } from 'three'
import { BoxData } from '../../type'

type BoxGameProps = {
  onClick: (id: string) => void
} & BoxData

export const BoxGame = ({
  id,
  position,
  rotation,
  thumbnail,
  onClick,
}: BoxGameProps) => {
  const textureLoader = new TextureLoader()

  console.log(thumbnail, 'thumbnail')

  const texture = textureLoader.load(thumbnail)

  return (
    <mesh
      castShadow
      position={position}
      rotation={rotation}
      onClick={() => onClick(id.toString())}
    >
      {/* Cartão de jogo */}
      <boxGeometry args={[1.6, 2.4, 0.1]} scale={2} />
      <meshStandardMaterial map={texture} color="white" opacity={0.8} />
    </mesh>
  )
}
