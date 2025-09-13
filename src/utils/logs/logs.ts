type LogType = 'error' | 'info' | 'warning' | 'success'

type Log = {
  log: string
  statusCode?: number
  type?: LogType
}

const logTypeDictionary = {
  success: '✔',
  error: '✖',
  info: 'ℹ',
  warning: '⚠',
}

export function getCustomLog({ log, statusCode, type = 'info' }: Log) {
  const occurrenceDate = new Date()

  const customLog = `${
    logTypeDictionary[type]
  } [${occurrenceDate.toLocaleString('pt-br')}] - ${log} ${
    statusCode ? `- status: ${statusCode}` : ''
  }`

  console.log(customLog)
}
