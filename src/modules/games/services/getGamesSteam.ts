'use server'

import { getCache, setCache } from '@/utils/cacheApiResult/cacheApiResult'
import ky from 'ky'
import { Game } from './getGames'

export type SteamApiResponse = {
  [appid: string]: {
    success: boolean
    data: GameSteam
  }
}

export type GameSteam = {
  type: string
  name: string
  steam_appid: number
  short_description: string
  header_image: string
  publishers?: string[]
  developers?: string[]
  genres?: Array<{ id: string; description: string }>
  platforms?: { windows: boolean; mac: boolean; linux: boolean }
  release_date?: { coming_soon: boolean; date: string }
}

export type GameResponse = Game[]

const cacheKey = 'games_steam'
const API_URL_STEAM = 'https://store.steampowered.com/api'

export const getGamesSteam = async (): Promise<GameResponse> => {
  const appids = [
    730, // Counter-Strike 2
    570, // Dota 2
    271590, // Grand Theft Auto V
    292030, // The Witcher 3: Wild Hunt
    1245620, // ELDEN RING
    1086940, // Baldur's Gate 3
    1091500, // Cyberpunk 2077
    1593500, // God of War (2018) - PC
    1888930, // The Last of Us Part I
    2357570, // Overwatch 2
    578080, // PUBG: BATTLEGROUNDS
    1172470, // Apex Legends
    1962663, // Call of Duty: Warzone (Warzone 2.0)
    1085660, // Destiny 2
    440, // Team Fortress 2
    1097150, // Fall Guys
    2344520, // Diablo IV
    945360, // Among Us
    3405690, // FC 26
    1240440, // Halo Infinite
  ] as const

  const cachedData = getCache<Game>(cacheKey)
  if (cachedData) return cachedData.data as GameResponse

  const requests = appids.map(async (id) => {
    const url = `${API_URL_STEAM}/appdetails?appids=${id}`
    const response = await ky.get(url)

    if (!response.ok) {
      throw new Error(`Steam Error: ${response.status} ${response.statusText}`)
    }

    const json = (await response.json()) as SteamApiResponse
    const appData = json[id.toString()]

    if (!appData.success) {
      throw new Error(`Steam API returned success: false for appid ${id}`)
    }

    const game = appData.data
    const gameData: Game = {
      id: game.steam_appid,
      title: game.name,
      thumbnail: game.header_image,
      game_url: `https://store.steampowered.com/app/${game.steam_appid}`,
      genre: game.genres?.[0]?.description || 'Unknown',
      short_description: game.short_description,
      platform: 'PC',
      publisher: game.publishers?.[0] || 'Unknown',
      developer: game.developers?.[0] || 'Unknown',
      release_date: game.release_date?.date || 'Unknown',
      freetogame_profile_url: `https://store.steampowered.com/app/${game.steam_appid}`,
    }

    return gameData
  })

  const data = await Promise.all(requests)

  setCache<Game>(cacheKey, data)

  return data
}
