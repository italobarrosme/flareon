'use client'
import dynamic from 'next/dynamic'
import { useRainBoxsGames } from '@/modules/games/hooks/useRainBoxsGames'

const Scene = dynamic(() => import('@/modules/3d/Scene'), {
  ssr: false,
})

const RenderCanvas = dynamic(() => import('@/modules/3d/RenderCanvas'), {
  ssr: false,
})

export default function Game() {
  const gameData = useRainBoxsGames()

  return (
    <RenderCanvas>
      <Scene gameData={gameData} />
    </RenderCanvas>
  )
}
