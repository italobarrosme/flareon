import { renderHook } from '@testing-library/react'
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest'
import { useRedirectTimeout } from './useRedirectTimeout'

const defineUrl = (url: string) => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: url,
    },
  })
}

describe('useRedirectTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    defineUrl('http://localhost:3000')
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('should redirect after the specified timeout', async () => {
    const redirectPath = 'redirecta'
    const timeout = 2000

    renderHook(() => useRedirectTimeout(timeout, redirectPath))

    expect(window.location.href).toBe('http://localhost:3000')

    await vi.advanceTimersByTimeAsync(timeout)

    expect(window.location.href).toBe(`${redirectPath}`)
  })

  it('should not redirect before timeout', async () => {
    const redirectPath = 'redirecta'
    const timeout = 3000

    renderHook(() => useRedirectTimeout(timeout, redirectPath))

    expect(window.location.href).toBe('http://localhost:3000')

    await vi.advanceTimersByTimeAsync(2000)

    expect(window.location.href).toBe('http://localhost:3000')
  })

  it('should handle immediate redirect with timeout 0', async () => {
    const redirectPath = 'redirecta'
    const timeout = 0

    renderHook(() => useRedirectTimeout(timeout, redirectPath))

    await vi.advanceTimersByTimeAsync(0)

    expect(window.location.href).toBe(`${redirectPath}`)
  })
})
