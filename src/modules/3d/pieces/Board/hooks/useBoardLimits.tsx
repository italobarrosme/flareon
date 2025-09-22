'use client'

import { useMemo } from 'react'

type BoardConfig = {
  position: [number, number, number]
  width: number
  height: number
}

type DragLimits = {
  x: [number, number]
  y: [number, number]
  z: [number, number]
}

// Configuração padrão do Board (mesmos valores do Board.tsx)
const DEFAULT_BOARD_CONFIG: BoardConfig = {
  position: [0, 7, 0.5],
  width: 16,
  height: 6,
}

/**
 * Hook que calcula os limites de arraste baseados na configuração do Board
 * Garante que os post-its sempre fiquem dentro da área do Board
 *
 * @param boardConfig - Configuração customizada do Board
 * @param currentPosition - Posição atual do objeto (para limites relativos)
 */
export const useBoardLimits = (
  boardConfig?: Partial<BoardConfig>,
  currentPosition?: [number, number, number]
): DragLimits => {
  const dragLimits = useMemo(() => {
    const config = { ...DEFAULT_BOARD_CONFIG, ...boardConfig }
    const [boardX, boardY, boardZ] = config.position
    const { width, height } = config

    // Calcular limites baseados na posição e dimensões do Board
    // Adicionar uma pequena margem interna para que o post-it não fique exatamente na borda
    const margin = 0.6

    // Limites absolutos do Board
    const absoluteLimits = {
      x: [boardX - width / 2 + margin, boardX + width / 2 - margin],
      y: [boardY - height / 2 + margin, boardY + height / 2 - margin],
      z: [boardZ + 0.05, boardZ + 0.5],
    }

    // Se currentPosition for fornecida, calcular limites relativos para DragControls
    if (currentPosition) {
      const [currentX, currentY, currentZ] = currentPosition
      return {
        x: [
          absoluteLimits.x[0] - currentX, // Limite relativo esquerdo
          absoluteLimits.x[1] - currentX, // Limite relativo direito
        ] as [number, number],
        y: [
          absoluteLimits.y[0] - currentY, // Limite relativo inferior
          absoluteLimits.y[1] - currentY, // Limite relativo superior
        ] as [number, number],
        z: [
          absoluteLimits.z[0] - currentZ, // Limite relativo inferior Z
          absoluteLimits.z[1] - currentZ, // Limite relativo superior Z
        ] as [number, number],
      }
    }

    // Retornar limites absolutos se currentPosition não for fornecida
    return {
      x: absoluteLimits.x as [number, number],
      y: absoluteLimits.y as [number, number],
      z: absoluteLimits.z as [number, number],
    }
  }, [boardConfig, currentPosition])

  return dragLimits
}

/**
 * Função que calcula os limites do Board (versão não-hook para uso em funções utilitárias)
 */
const calculateBoardLimits = (
  boardConfig?: Partial<BoardConfig>
): DragLimits => {
  const config = { ...DEFAULT_BOARD_CONFIG, ...boardConfig }
  const [boardX, boardY, boardZ] = config.position
  const { width, height } = config
  const margin = 0.2

  return {
    x: [boardX - width / 2 + margin, boardX + width / 2 - margin] as [
      number,
      number,
    ],
    y: [boardY - height / 2 + margin, boardY + height / 2 - margin] as [
      number,
      number,
    ],
    z: [boardZ + 0.05, boardZ + 0.5] as [number, number],
  }
}

/**
 * Função utilitária para verificar se uma posição está dentro dos limites do Board
 */
export const isPositionWithinBoardLimits = (
  position: [number, number, number],
  boardConfig?: Partial<BoardConfig>
): boolean => {
  const limits = calculateBoardLimits(boardConfig)
  const [x, y, z] = position

  return (
    x >= limits.x[0] &&
    x <= limits.x[1] &&
    y >= limits.y[0] &&
    y <= limits.y[1] &&
    z >= limits.z[0] &&
    z <= limits.z[1]
  )
}

/**
 * Função para ajustar uma posição para que fique dentro dos limites do Board
 */
export const clampPositionToBoardLimits = (
  position: [number, number, number],
  boardConfig?: Partial<BoardConfig>
): [number, number, number] => {
  const limits = calculateBoardLimits(boardConfig)
  const [x, y, z] = position

  return [
    Math.max(limits.x[0], Math.min(limits.x[1], x)),
    Math.max(limits.y[0], Math.min(limits.y[1], y)),
    Math.max(limits.z[0], Math.min(limits.z[1], z)),
  ]
}
