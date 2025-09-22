'use client'

import { Physics, RigidBody } from '@react-three/rapier'
import { AnimatedBoxGame } from '@/modules/games/boxGame/components'
import { GameInfoPlane } from '@/modules/games/components'
import { useChooseGames } from '@/modules/games/hooks/useChooseGames'
import { BoxData } from '@/modules/games/boxGame/type'
import { ThreeEvent } from '@react-three/fiber'

type SceneProps = {
  gameData: {
    boxes: BoxData[]
    isLoading: boolean
    totalGames?: number
    loadedGames?: number
    isLoadingGradually?: boolean
    error?: string
  }
}

export const Scene = ({ gameData }: SceneProps) => {
  // const { animateToTarget, resetCamera } = useCameraAnimationContext()
  // const [isBoardFocused, setIsBoardFocused] = useState(false)

  // const handleBoardClick = () => {
  //   if (isBoardFocused) {
  //     // Se já está focado, volta para a visão geral
  //     resetCamera()
  //     setIsBoardFocused(false)
  //   } else {
  //     // Foca no board - posição próxima ao board para melhor visualização
  //     animateToTarget({
  //       position: [0, 7, 7], // Posição próxima ao board
  //       lookAt: [0, 7, 0], // Olha diretamente para o board
  //     })
  //     setIsBoardFocused(true)
  //   }
  // }

  // const handleSceneMiss = () => {
  //   if (isBoardFocused) {
  //     resetCamera()
  //     setIsBoardFocused(false)
  //   }
  // }

  const {
    handleChooseGames,
    selectedGame,
    showInfo,
    resetGameSelection,
    getInfoPlanePosition,
    getSelectedGamePosition,
  } = useChooseGames()
  const { boxes } = gameData

  if (!boxes) return null

  return (
    <group>
      <Physics>
        <RigidBody type="fixed">
          <mesh receiveShadow position={[0, -1, 0]}>
            <boxGeometry args={[20, 1, 20]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </RigidBody>
        {boxes.map((box: BoxData, index: number) => {
          const isSelected = selectedGame?.id === box.id
          const targetPosition: [number, number, number] = isSelected
            ? getSelectedGamePosition() // Posição calculada dinamicamente
            : box.position

          return (
            <AnimatedBoxGame
              key={`${box.id}-${index}`}
              boxData={box}
              isSelected={isSelected}
              targetPosition={targetPosition}
              onClick={(e: ThreeEvent<MouseEvent>) => {
                handleChooseGames(e, box.title, box)
              }}
            />
          )
        })}
      </Physics>

      {/* Plano de informações do jogo selecionado */}
      {selectedGame && showInfo && (
        <GameInfoPlane
          gameData={selectedGame}
          position={getInfoPlanePosition()} // Posição calculada dinamicamente
          onClose={resetGameSelection}
          visible={showInfo}
        />
      )}
    </group>
  )
}
