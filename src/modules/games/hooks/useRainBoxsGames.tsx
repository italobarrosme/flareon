import { useEffect, useState, useRef } from 'react'
import { BoxData } from '../boxGame/type'
import { useQuery } from '@tanstack/react-query'
import { Game } from '../services/getGames'
import { generateGameId } from '@/modules/common/utils'
import { getGamesSteam } from '../services/getGamesSteam'

// Configuração do intervalo entre cada box que cai (em milissegundos)
const RAIN_INTERVAL = 800 // 800ms = 0.3 segundos entre cada box

export const useRainBoxsGames = () => {
  const [boxes, setBoxes] = useState<BoxData[]>([])
  const gameIndexRef = useRef(0)
  const [loadedGames, setLoadedGames] = useState(0)

  const {
    data: games,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['games'],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: false,
    queryFn: getGamesSteam,
  })

  // Efeito para fazer os games caírem gradualmente quando os dados chegam
  useEffect(() => {
    if (!isSuccess || !games || games.length === 0) {
      return
    }

    // Reset quando novos dados chegam
    setBoxes([])
    gameIndexRef.current = 0
    setLoadedGames(0)

    const interval = setInterval(() => {
      if (gameIndexRef.current >= games.length) {
        clearInterval(interval)
        return
      }

      const game: Game = games[gameIndexRef.current]
      const uniqueId = generateGameId(game.id, gameIndexRef.current)

      const newBox: BoxData = {
        id: uniqueId,
        thumbnail: game.thumbnail,
        title: game.title,
        short_description: game.short_description,
        game_url: game.game_url,
        genre: game.genre,
        platform: game.platform,
        publisher: game.publisher,
        developer: game.developer,
        release_date: game.release_date,
        freetogame_profile_url: game.freetogame_profile_url,
        position: [
          (Math.random() - 0.5) * 10, // X entre -5 e 5
          Math.random() * 12 + 10, // Y entre 10 e 20 (pra cair de cima)
          (Math.random() - 0.5) * 10, // Z entre -5 e 5
        ],
        rotation: [
          Math.random() * Math.PI * 2, // Rotação X aleatória (0 a 2π radianos)
          Math.random() * Math.PI * 2, // Rotação Y aleatória (0 a 2π radianos)
          Math.random() * Math.PI * 2, // Rotação Z aleatória (0 a 2π radianos)
        ],
      }

      setBoxes((prev) => [...prev, newBox])
      gameIndexRef.current += 1
      setLoadedGames(gameIndexRef.current)
    }, RAIN_INTERVAL)

    return () => clearInterval(interval)
  }, [isSuccess, games])

  if (isLoading) return { boxes: [], isLoading: true }
  if (error) return { boxes: [], error: error.message, isLoading: false }

  return {
    boxes,
    isLoading: false,
    totalGames: games?.length || 0,
    loadedGames,
    isLoadingGradually: loadedGames < (games?.length || 0),
  }
}
