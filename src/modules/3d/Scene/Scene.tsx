'use client'

import { Physics, RigidBody } from '@react-three/rapier'
import { BoxGame } from '@/modules/games/boxGame/components'
import { useChooseGames } from '@/modules/games/hooks/useChooseGames'
import { BoxData } from '@/modules/games/boxGame/type'

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

  const { handleChooseGames } = useChooseGames()
  const { boxes } = gameData

  if (!boxes) return null

  // Para ver logs do progresso, descomente a linha de hook acima e:
  // console.log(`Carregamento: ${loadedGames}/${totalGames} games`)

  return (
    <group>
      <Physics>
        {/* chão */}
        <RigidBody type="fixed">
          <mesh receiveShadow position={[0, -1, 0]}>
            <boxGeometry args={[20, 1, 20]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </RigidBody>

        {/* caixa que cai */}

        {boxes.map((box: BoxData, index: number) => (
          <RigidBody key={`${box.id}-${index}`}>
            <BoxGame
              {...box}
              position={box.position}
              rotation={box.rotation}
              onClick={() => {
                console.log('Game clicado:', box.title)
                handleChooseGames(box.title)
              }}
            />
          </RigidBody>
        ))}
      </Physics>
    </group>
  )
}
