'use server'

import { getCache, setCache } from '@/utils/cacheApiResult/cacheApiResult'
// import ky from 'ky'
import { mockGetGamesResult } from './mockGetGamesResult'

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

// Configuração RapidAPI
// const API_RAPIDAPI_FRETOGAMES_URL = process.env.API_RAPIDAPI_FRETOGAMES_URL
// const API_RAPIDAPI_KEY = process.env.API_RAPIDAPI_KEY
// const API_RAPIDAPI_HOST_GAMES = process.env.API_RAPIDAPI_HOST_GAMES

export const getGames = async (): Promise<GameResponse> => {
  const cachedData = getCache<Game>(cacheKey)

  if (cachedData) {
    return cachedData.data
  }

  // const response = await ky.get<GameResponse>(
  //   `${API_RAPIDAPI_FRETOGAMES_URL}/games`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': API_RAPIDAPI_KEY!,
  //       'X-RapidAPI-Host': API_RAPIDAPI_HOST_GAMES!,
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )

  // if (!response.ok) {
  //   throw new Error(`RapidAPI Error: ${response.status} ${response.statusText}`)
  // }

  // const data = await response.json()

  setCache<Game>(cacheKey, mockGetGamesResult)

  return mockGetGamesResult
}
