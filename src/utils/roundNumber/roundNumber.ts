export const roundNumber = (value: number, numDecimalsPlaces = 2) => {
  const format = Number(
    Math.round(Number(value + 'e' + numDecimalsPlaces)) +
      'e-' +
      numDecimalsPlaces
  )

  return format > 0 ? `+${format}` : `${format}`
}
