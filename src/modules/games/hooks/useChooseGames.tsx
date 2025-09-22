import { ThreeEvent } from '@react-three/fiber'
import { BoxData } from '../boxGame/type'
import { useCallback, useState } from 'react'

export const useChooseGames = () => {
  const [selectedGame, setSelectedGame] = useState<BoxData | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleChooseGames = (
    event: ThreeEvent<MouseEvent>,
    gameTitle: string,
    game: BoxData
  ) => {
    event.nativeEvent.preventDefault()
    event.stopPropagation()
    setSelectedGame(game)
    setIsAnimating(true)
    setShowInfo(false)

    // Após 1.5 segundos de animação, mostra as informações
    setTimeout(() => {
      setIsAnimating(false)
      setShowInfo(true)
    }, 1500)
  }

  const resetGameSelection = useCallback(() => {
    setShowInfo(false)
    setIsAnimating(true)

    // Anima de volta e depois limpa a seleção
    setTimeout(() => {
      setSelectedGame(null)
      setIsAnimating(false)
    }, 1000)
  }, [])

  // Posições fixas para quando um jogo é selecionado
  const getSelectedGamePosition = useCallback((): [number, number, number] => {
    return [3, 5, 5] // Posição do jogo selecionado (próximo da câmera, lado esquerdo)
  }, [])

  const getInfoPlanePosition = useCallback((): [number, number, number] => {
    return [0, 5, 4] // Posição do plano (direita)
  }, [])

  return {
    handleChooseGames,
    resetGameSelection,
    selectedGame,
    isAnimating,
    showInfo,
    getInfoPlanePosition,
    getSelectedGamePosition,
  }
}
