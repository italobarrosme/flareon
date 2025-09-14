'use server'

import { getCache, setCache } from '@/utils/cacheApiResult/cacheApiResult'
// import { api } from '@/modules/common/http/apiKy'
// import { mockGetGamesResult } from './mockGetGamesResult'

export type Game = {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

export type GameResponse = Game[]

const cacheKey = 'games'
const API_FREETOGAMES_URL = process.env.API_FREETOGAMES_URL

export const getGames = async (): Promise<GameResponse> => {
  const cachedData = getCache<Game>(cacheKey)

  if (cachedData) {
    return cachedData.data
  }

  const response = await fetch(`${API_FREETOGAMES_URL}/games`)
  const data = await response.json()

  setCache<Game>(cacheKey, data)

  return data

  // return mockGetGamesResult
}
