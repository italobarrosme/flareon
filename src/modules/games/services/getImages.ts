'use server'

import { getCache, setCache } from '@/utils/cacheApiResult/cacheApiResult'
import ky from 'ky'

const cachekey = 'imagesGames'

const API_RAPIDAPI_IMAGES_URL = process.env.API_RAPIDAPI_IMAGES_URL
const API_RAPIDAPI_KEY = process.env.API_RAPIDAPI_KEY
const API_RAPIDAPI_HOST_IMAGES = process.env.API_RAPIDAPI_HOST_IMAGES

type Image = {
  id: string
  title: string
  url: string
  width: number
  height: number
  size: string
  background_color: string
  thumbnail_url: string
  thumbnail_width: number
  thumbnail_height: number
  source: string
  source_url: string
  source_domain: string
  position: number
  rank: number
}

export const getImage = async (gameSearch: string): Promise<Image> => {
  const cachedData = getCache<Image>(cachekey)

  if (cachedData) {
    return cachedData.data[0]
  }

  const response = await ky.get<Image[]>(
    `${API_RAPIDAPI_IMAGES_URL}/search?query=${gameSearch}&limit=1`,
    {
      headers: {
        'X-RapidAPI-Key': API_RAPIDAPI_KEY!,
        'X-RapidAPI-Host': API_RAPIDAPI_HOST_IMAGES!,
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await response.json()

  const firstImage = data[0]

  setCache<Image>(cachekey, [firstImage])

  return firstImage
}
