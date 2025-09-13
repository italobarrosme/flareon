import { getCustomLog } from '@/utils/logs/logs'
import ky, { HTTPError, KyRequest, KyResponse, Options } from 'ky'
import { status } from './constants'

/** Extends Ky Options with debug flag */
declare module 'ky' {
  interface Options {
    debug?: boolean
  }
}

const options: Options = {
  prefixUrl: process.env.BFF_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, //! 30 seconds, validate if necessary. Default is 10s
  debug: false,
}

/** Logs request details when debug mode is enabled */
const beforeRequestLog = async (request: KyRequest, options: Options) => {
  if (!options.debug) return

  getCustomLog({
    type: 'info',
    log: `${JSON.stringify({ url: request.url, method: request.method }, null, 2)}`,
  })
}

/**
 * Handles response logging
 * - Always logs errors
 * - Logs success responses only in debug mode
 */
const afterResponseLog = async (
  request: KyRequest,
  options: Options,
  response: KyResponse
) => {
  if (status.statusError.includes(response.status)) {
    const error: HTTPError = await response.json()
    getCustomLog({
      type: 'error',
      log: `${JSON.stringify(
        {
          url: request.url,
          method: request.method,
          status: response.status,
          error: error.message,
        },
        null,
        2
      )}`,
    })
    return
  }

  if (status.statusSuccess.includes(response.status) && options.debug) {
    getCustomLog({
      type: 'info',
      log: `${JSON.stringify(
        {
          url: request.url,
          method: request.method,
          status: response.status,
          response: await response.json(),
        },
        null,
        2
      )}`,
    })
  }
}

/**
 * Creates a configured Ky instance
 * @param customOptions - Override default options and enable/disable debug mode
 * @example
 * const debugApi = createApi({ debug: true })
 */
export const createApi = (customOptions: Partial<Options> = {}) => {
  return ky.create({ ...options, ...customOptions }).extend({
    hooks: {
      beforeRequest: [beforeRequestLog],
      afterResponse: [afterResponseLog],
    },
  })
}

/** Default API instance with error-only logging */
export const api = createApi()
