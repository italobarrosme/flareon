export const useChooseGames = () => {
  const handleChooseGames = (gameTitle: string) => {
    console.log(gameTitle, 'game selected')
  }

  return {
    handleChooseGames,
  }
}
