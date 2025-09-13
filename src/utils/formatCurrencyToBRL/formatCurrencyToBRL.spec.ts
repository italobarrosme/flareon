import { formatCurrencyToBRL } from './formatCurrencyToBRL'

describe('formatCurrencyToBRL', () => {
  it('should format currency to BRL', () => {
    const value = 1000
    const formattedValue = formatCurrencyToBRL(value)

    expect(formattedValue).toBe('R$ 1.000,00')
  })

  it('should format currency to BRL with cents', () => {
    const value = 1000.5
    const formattedValue = formatCurrencyToBRL(value)

    expect(formattedValue).toBe('R$ 1.000,50')
  })

  it('should format currency to BRL with cents and negative value', () => {
    const value = -1000.5
    const formattedValue = formatCurrencyToBRL(value)

    expect(formattedValue).toBe('-R$ 1.000,50')
  })

  it('should return empty string if value is falsy', () => {
    const value = 0
    const formattedValue = formatCurrencyToBRL(value)

    expect(formattedValue).toBe('')
  })

  it('should format currency to BRL with cents and isMoneyFormattedAsIntValue', () => {
    const value = 100050
    const formattedValue = formatCurrencyToBRL(value, true)

    expect(formattedValue).toBe('R$ 1.000,50')
  })

  it('should format currency to BRL with cents and negative value and isMoneyFormattedAsIntValue', () => {
    const value = -100050
    const formattedValue = formatCurrencyToBRL(value, true)

    expect(formattedValue).toBe('-R$ 1.000,50')
  })
})
