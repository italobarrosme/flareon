'use client'

import { Board } from '../pieces/Board/Board'
import { PostIt } from '../pieces/PostIt'
import { usePostItManager } from '../pieces/PostIt/hooks'
import { Table } from '../pieces/Table'
import { Select } from '@react-three/drei'
import { PostItNotePad } from '../pieces/PostItNotePad'
import { useCameraAnimationContext } from '../animations/components/CameraAnimationWrapper'
import { useState } from 'react'

export const Scene = () => {
  const { postIts, updatePostIt } = usePostItManager()
  const { animateToTarget, resetCamera } = useCameraAnimationContext()
  const [isBoardFocused, setIsBoardFocused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleBoardClick = () => {
    if (isBoardFocused && !isDragging) {
      // Se já está focado, volta para a visão geral
      resetCamera()
      setIsBoardFocused(false)
    } else {
      // Foca no board - posição próxima ao board para melhor visualização
      animateToTarget({
        position: [0, 7, 7], // Posição próxima ao board
        lookAt: [0, 7, 0], // Olha diretamente para o board
      })
      setIsBoardFocused(true)
    }
  }

  const handleSceneMiss = () => {
    if (isBoardFocused && !isDragging) {
      resetCamera()
      setIsBoardFocused(false)
    }
  }

  return (
    <group onPointerMissed={handleSceneMiss}>
      <Select>
        <Board onClick={handleBoardClick} />
      </Select>
      {postIts.map((postIt) => (
        <PostIt
          key={postIt.id}
          position={postIt.position}
          label={postIt.label}
          color={postIt.color}
          onTextChange={(newText) =>
            updatePostIt(postIt.id, { label: newText })
          }
          onInteractionStart={() => setIsDragging(true)}
          onInteractionEnd={() => setIsDragging(false)}
        />
      ))}
      <Select>
        <Table position={[-5, 0.1, 3.1]} />
      </Select>
      <PostItNotePad position={[-5.5, 1.5, 3.1]} />
      {/* <Room /> */}
    </group>
  )
}
