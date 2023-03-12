import { makeLogger, LOG_LEVELS } from './index.js'
import { dateFormat } from './printer.js'
import type { LogLevelsUnion } from './types.js'

import { SpyInstance } from 'vitest'

const mockConsole = () => {
  const log = LOG_LEVELS.reduce<Record<LogLevelsUnion, SpyInstance>>(
    (acc, level) => {
      const method = vi
        .spyOn(console, level as LogLevelsUnion)
        .mockImplementation(() => ({ log: () => vi.fn }))
      acc[level] = method
      return acc
    },
    {} as any
  )

  const restore = () => {
    Object.values(log).map((mock) => mock.mockRestore())
  }

  return { restore, log }
}

describe('Logger', () => {
  test('make logger', () => {
    const logger = makeLogger({ format: 'json', level: 'error' })
    expect(logger).toBeDefined()
  })

  test('date format', () => {
    const testingDate = Number(new Date('2022-01-01T13:58:22.854Z')) / 1000
    const dateStr = dateFormat(testingDate)

    expect(dateStr).toMatchInlineSnapshot(`"2022-01-01 17:58:22"`)
  })

  test.todo('json output')

  test.todo('test simple output')

  describe('print level', () => {
    test('debug enabled: debug logs should be printing', () => {
      const { restore, log } = mockConsole()
      const logger = makeLogger({ format: 'json', level: 'debug' })

      logger.debug('test')

      expect(log.debug).toHaveBeenCalledTimes(1)

      LOG_LEVELS.filter((level) => level !== 'debug').map((level) =>
        expect(log[level]).toHaveBeenCalledTimes(0)
      )

      restore()
    })

    test("debug enabled: debug logs shouldn't be printing", () => {
      const { restore, log } = mockConsole()
      const logger = makeLogger({ format: 'json', level: 'info' })

      logger.debug('test')

      expect(log.debug).toHaveBeenCalledTimes(0)

      LOG_LEVELS.filter((level) => level !== 'debug').map((level) =>
        expect(log[level]).toHaveBeenCalledTimes(0)
      )

      restore()
    })

    test('error enabled: all logs except the error must be hidden', () => {
      const { restore, log } = mockConsole()
      const logger = makeLogger({ format: 'json', level: 'error' })

      logger.error('test')

      expect(log.error).toHaveBeenCalledTimes(1)

      LOG_LEVELS.filter((level) => level !== 'error').map((level) => {
        logger[level]('test')
        expect(log[level]).toHaveBeenCalledTimes(0)
      })

      restore()
    })
  })
})
