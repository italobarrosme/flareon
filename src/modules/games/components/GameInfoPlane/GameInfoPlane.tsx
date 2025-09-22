import { Html } from '@react-three/drei'
import { BoxData } from '@/modules/games/boxGame/type'
import { GameInfoUI } from './GameInfoUI'

type GameInfoPlaneProps = {
  gameData: BoxData
  position: [number, number, number]
  onClose: () => void
  visible?: boolean
}

export const GameInfoPlane = ({
  gameData,
  position,
  onClose,
  visible = true,
}: GameInfoPlaneProps) => {
  if (!visible) return null

  return (
    <group position={position}>
      {/* Plano de fundo 3D */}
      <mesh>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.95} />
      </mesh>

      {/* Borda do plano */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[4.1, 5.1]} />
        <meshStandardMaterial color="#16213e" transparent opacity={0.8} />
      </mesh>

      {/* Conteúdo HTML sobreposto */}
      <Html
        transform
        occlude
        position={[0, 0, 0.01]}
        style={{
          width: '380px',
          height: '640px',
          pointerEvents: 'all',
          userSelect: 'none',
        }}
      >
        <GameInfoUI gameData={gameData} onClose={onClose} />
      </Html>
    </group>
  )
}
