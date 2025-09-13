import { roundNumber } from './roundNumber'
import { describe, it, expect } from 'vitest'
describe('roundNumber', () => {
  it('should default to 2 decimal places', () => {
    expect(roundNumber(3.14159)).toBe('+3.14')

    expect(roundNumber(2.71828)).toBe('+2.72')

    expect(roundNumber(42.98765)).toBe('+42.99')
  })

  it('should round a number to the specified number of decimal places', () => {
    expect(roundNumber(3.14159, 2)).toBe('+3.14')

    expect(roundNumber(2.71828, 3)).toBe('+2.718')

    expect(roundNumber(42.98765, 0)).toBe('+43')
  })

  it('should handle negative numbers', () => {
    // Teste números negativos
    expect(roundNumber(-5.6789, 2)).toBe('-5.68')
  })

  it('should handle edge case with zero', () => {
    // Teste com o número zero
    expect(roundNumber(0, 3)).toBe('0')
  })
})
