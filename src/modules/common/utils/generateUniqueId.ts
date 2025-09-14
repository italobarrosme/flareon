/**
 * Gera um ID único combinando múltiplas fontes de aleatoriedade
 * @param prefix - Prefixo opcional para o ID
 * @returns ID único como string
 */
export function generateUniqueId(prefix?: string): string {
  // Combina timestamp, random e performance.now() para máxima unicidade
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const performanceNow = performance.now().toString().replace('.', '')

  const uniquePart = `${timestamp}-${random}-${performanceNow}`

  return prefix ? `${prefix}-${uniquePart}` : uniquePart
}

/**
 * Gera um ID único para games específicamente
 * @param gameId - ID original do game
 * @param index - Índice do game na lista
 * @returns ID único para o game
 */
export function generateGameId(gameId: number, index: number): string {
  return generateUniqueId(`game-${gameId}-${index}`)
}
