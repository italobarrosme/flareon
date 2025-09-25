'use server'

import { api } from '@/modules/common/http/apiKy'

// Tipos básicos para IGDB
export type IGDBGame = {
  id: number
  name: string
  summary?: string
  cover?: {
    url: string
  }
  genres?: Array<{
    name: string
  }>
  platforms?: Array<{
    name: string
  }>
  release_dates?: Array<{
    human: string
  }>
  involved_companies?: Array<{
    company: {
      name: string
    }
    developer: boolean
    publisher: boolean
  }>
}

/**
 * Autenticar na API do IGDB via Twitch
 */
export const authenticateIGDB = async (): Promise<string | null> => {
  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    console.error('TWITCH_CLIENT_ID ou TWITCH_CLIENT_SECRET não configurados')
    return null
  }

  try {
    const response = await api.post(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    )

    const data = (await response.json()) as {
      access_token?: string
    }

    return data.access_token || null
  } catch (error) {
    console.error('Erro na autenticação IGDB:', error)
    return null
  }
}

/**
 * Buscar jogos do IGDB
 */
export const getGamesIGDB = async (limit: number = 20): Promise<IGDBGame[]> => {
  const clientId = process.env.IGDB_CLIENT_ID
  const accessToken = process.env.IGDB_ACCESS_TOKEN

  if (!clientId || !accessToken) {
    console.error('IGDB_CLIENT_ID ou IGDB_ACCESS_TOKEN não configurados')
    return []
  }

  const query = `
    fields 
      name,
      summary,
      cover.url,
      genres.name,
      platforms.name,
      release_dates.human,
      involved_companies.company.name,
      involved_companies.developer,
      involved_companies.publisher;
    where rating > 70;
    sort total_rating_count desc;
    limit ${limit};
  `

  try {
    const response = await api.post('https://api.igdb.com/v4/games', {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'text/plain',
      },
      body: query,
    })

    const games: IGDBGame[] = await response.json()

    return games
  } catch (error) {
    console.error('Erro ao buscar jogos do IGDB:', error)
    return []
  }
}
