import { getCustomLog } from './logs'
import { vi, describe, it, beforeEach, afterAll, expect } from 'vitest'
const mockDate = new Date('1/1/2021, 12:00:00')
const consoleMock = vi.spyOn(console, 'log')

describe('logs', () => {
  beforeEach(() => {
    vi.spyOn(global, 'Date').mockImplementation(() => mockDate)

    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  it('should return success log', () => {
    getCustomLog({ log: 'success log', type: 'success' })

    expect(consoleMock).toHaveBeenCalledWith(
      '✔ [01/01/2021, 12:00:00] - success log '
    )
  })

  it('should return error log', () => {
    getCustomLog({ log: 'error log', type: 'error' })

    expect(consoleMock).toHaveBeenCalledWith(
      '✖ [01/01/2021, 12:00:00] - error log '
    )
  })

  it('should return info log', () => {
    getCustomLog({ log: 'info log', type: 'info' })

    expect(consoleMock).toHaveBeenCalledWith(
      'ℹ [01/01/2021, 12:00:00] - info log '
    )
  })

  it('should return warning log', () => {
    getCustomLog({ log: 'warning log', type: 'warning' })

    expect(consoleMock).toHaveBeenCalledWith(
      '⚠ [01/01/2021, 12:00:00] - warning log '
    )
  })

  it('should return log with status code', () => {
    getCustomLog({ log: 'log with status code', type: 'info', statusCode: 200 })

    expect(consoleMock).toHaveBeenCalledWith(
      'ℹ [01/01/2021, 12:00:00] - log with status code - status: 200'
    )
  })

  it('should call console.log with default type', () => {
    getCustomLog({ log: 'log with default type' })

    expect(consoleMock).toHaveBeenCalledWith(
      'ℹ [01/01/2021, 12:00:00] - log with default type '
    )
  })

  afterAll(() => {
    consoleMock.mockRestore()
  })
})
