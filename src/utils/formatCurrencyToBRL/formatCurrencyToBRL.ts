export function formatCurrencyToBRL(
  value: number,
  isMoneyFormattedAsIntValue = false
): string {
  if (!value) return ''
  if (isMoneyFormattedAsIntValue) {
    value = value / 100
  }

  const parsedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

  return parsedValue
}
