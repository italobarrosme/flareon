import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { RigidBody } from '@react-three/rapier'
import { BoxGame } from '../BoxGame/BoxGame'
import { BoxData } from '../../type'
import { ThreeEvent } from '@react-three/fiber'

type AnimatedBoxGameProps = {
  boxData: BoxData
  isSelected: boolean
  targetPosition: [number, number, number]
  onClick: (e: ThreeEvent<MouseEvent>) => void
}

export const AnimatedBoxGame = ({
  boxData,
  isSelected,
  targetPosition,
  onClick,
}: AnimatedBoxGameProps) => {
  const groupRef = useRef<any>(null)
  const rigidBodyRef = useRef<any>(null)
  const currentPosition = useRef(new Vector3(...boxData.position))
  const targetVec = useRef(new Vector3(...targetPosition))
  const wasSelected = useRef(false)

  // Atualiza a posição alvo quando muda
  useEffect(() => {
    targetVec.current.set(...targetPosition)
    console.log(
      `🎯 Target position updated for ${boxData.id}:`,
      targetPosition,
      'isSelected:',
      isSelected
    )

    // Quando fica selecionado pela primeira vez, pega a posição atual do RigidBody
    if (isSelected && !wasSelected.current && rigidBodyRef.current) {
      const currentPos = rigidBodyRef.current.translation()
      currentPosition.current.set(currentPos.x, currentPos.y, currentPos.z)
      console.log(
        `🚀 Starting animation from:`,
        currentPos,
        'to:',
        targetPosition
      )
    }

    wasSelected.current = isSelected
  }, [targetPosition, isSelected, boxData.id])

  // Animação suave da posição apenas do grupo (não afeta física)
  useFrame((_, delta) => {
    if (!groupRef.current) return

    if (isSelected) {
      const lerpFactor = 3 * delta // Velocidade da animação

      // Interpola entre posição atual e alvo
      currentPosition.current.lerp(targetVec.current, lerpFactor)

      // Aplica a nova posição no grupo, não no RigidBody
      groupRef.current.position.copy(currentPosition.current)
      groupRef.current.rotation.set(0, 0, 0) // Zera rotação quando selecionado
    } else {
      // Quando não selecionado, volta para posição do RigidBody
      currentPosition.current.copy(targetVec.current)
      groupRef.current.position.copy(currentPosition.current)
    }
  })

  // Se estiver selecionado, não renderiza o RigidBody (só o objeto animado)
  if (isSelected) {
    return (
      <group ref={groupRef} position={targetPosition}>
        <BoxGame
          {...boxData}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          onClick={onClick}
        />
      </group>
    )
  }

  // Se não estiver selecionado, renderiza normalmente com física
  return (
    <RigidBody position={boxData.position} rotation={boxData.rotation}>
      <BoxGame
        {...boxData}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        onClick={onClick}
      />
    </RigidBody>
  )
}
