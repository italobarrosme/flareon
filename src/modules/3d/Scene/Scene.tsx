'use client'

import { Physics, RigidBody } from '@react-three/rapier'
import { AnimatedBoxGame } from '@/modules/games/boxGame/components'
import { GameInfoPlane } from '@/modules/games/components'
import { useChooseGames } from '@/modules/games/hooks/useChooseGames'
import { BoxData } from '@/modules/games/boxGame/type'
import { ThreeEvent } from '@react-three/fiber'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { useRef } from 'react'
import { Selection, Select } from '@react-three/postprocessing'
import { Pointer } from '../animations/components/Pointer/Pointer'

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
  const floorRef = useRef<any>(null)
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
    <>
      <Selection>
        <EffectComposer>
          <Outline
            selection={floorRef}
            visibleEdgeColor={0xffffff}
            hiddenEdgeColor={0x000000}
            width={2}
            edgeStrength={10}
          />
        </EffectComposer>

        <group>
          <Physics>
            <RigidBody type="fixed">
              <Select>
                <mesh receiveShadow position={[0, -3, 0]} ref={floorRef}>
                  <boxGeometry args={[20, 1, 20]} />
                  <meshStandardMaterial color="#e3b4e4" />
                </mesh>
              </Select>
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
            <Pointer />
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
      </Selection>
    </>
  )
}
