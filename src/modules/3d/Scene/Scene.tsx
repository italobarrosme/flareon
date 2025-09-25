'use client'

import { Physics, RigidBody } from '@react-three/rapier'
import { AnimatedBoxGame } from '@/modules/games/boxGame/components'
import { GameInfoPlane, GameInfoUI } from '@/modules/games/components'
import { useChooseGames } from '@/modules/games/hooks/useChooseGames'
import { BoxData } from '@/modules/games/boxGame/type'
import { ThreeEvent } from '@react-three/fiber'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { useRef } from 'react'
import { Selection, Select } from '@react-three/postprocessing'
import { Chair } from '../pieces/chair/chair'
import { Sofa } from '../pieces/Sofa'
import { DeskTable } from '../pieces/desk-table/desk-table'
import { Closet } from '../pieces/closet/closet'
import { Case } from '../pieces/case/case'
import { Html } from '@react-three/drei'
import { Dog } from '../pieces/dog/dog'
import { Bed2 } from '../pieces/Bed2'
import { RapierDebug } from '../utils/RapierDebug'

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
            <RapierDebug />
            <RigidBody type="fixed">
              <Select>
                <mesh receiveShadow position={[0, -3, 0]} ref={floorRef}>
                  <boxGeometry args={[25, 1, 25]} />
                  <meshStandardMaterial color="#e3b4e4" />
                </mesh>
              </Select>
            </RigidBody>
            <RigidBody>
              <Chair position={[6, 0, -5]} rotation={[0, -11, 0]} />
            </RigidBody>
            <RigidBody position={[-8, 0, -6]} rotation={[-Math.PI / 2, 0, 0]}>
              <Bed2 />
            </RigidBody>
            <RigidBody>
              <Case position={[9, 10, -1.1]} rotation={[0, 11, 0]} />
            </RigidBody>
            <RigidBody>
              <DeskTable position={[8, 0, -5]} rotation={[0, 11, 0]} />
            </RigidBody>
            <RigidBody>
              <Sofa position={[-8.5, 0, 8]} rotation={[0, -11, 0]} />
            </RigidBody>
            <RigidBody>
              <Closet position={[9, 0, 5]} rotation={[0, 11, 0]} />
            </RigidBody>
            <RigidBody>
              <Dog position={[9, 12, 5]} rotation={[0, 11, 0]} />
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
            <Html
              transform
              position={[-7, 10, -10]}
              style={{
                pointerEvents: 'all',
                userSelect: 'none',
              }}
            >
              <section className="flex flex-col justify-center gap-4 bg-game-info-bg-primary max-w-96 p-4 rounded-2xl">
                <h1 className="text-4xl font-bold text-game-info-text-primary">
                  Bem-vindo! Explore os jogos disponíveis nos cases espalhados
                  pelo quarto
                </h1>
                <p className="text-game-info-text-secondary text-lg">
                  Use o mouse para navegar pelo quarto e selecionar os jogos.
                </p>
                <ul className=" text-game-info-text-secondary text-lg">
                  <li>
                    <strong>Zoom:</strong> scroll do mouse
                  </li>
                  <li>
                    <strong>Rotacionar:</strong> pressionar o botão esquerdo do
                    mouse
                  </li>
                  <li>
                    <strong>Mover:</strong> pressionar o botão direito do mouse
                  </li>
                </ul>
              </section>
            </Html>

            {/* Plano de informações do jogo selecionado */}
            {selectedGame && showInfo && (
              <GameInfoPlane
                position={[0, 5, 10]} // Posição calculada dinamicamente
                visible={showInfo}
              >
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
                  <GameInfoUI
                    gameData={selectedGame}
                    onClose={resetGameSelection}
                  />
                </Html>
              </GameInfoPlane>
            )}
          </Physics>
        </group>
      </Selection>
    </>
  )
}
