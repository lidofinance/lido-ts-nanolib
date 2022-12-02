import type { Histogram } from 'prom-client'

import { makeLogger } from '../logger'

const jobLockMap: Record<string, boolean> = {}

type Keys = 'start' | 'pooling'

export const makeJobRunner = <Initial extends Record<Keys, unknown>>(
  name: string,
  di: {
    config: { JOB_INTERVAL: number }
    logger: ReturnType<typeof makeLogger>
    metric: Histogram
  },
  initial: Initial
) => {
  return async (
    cb: (handlerValue: Initial[Keys]) => Promise<void>
  ) => {
    const handler = async (handlerValue: Initial[Keys]) => {
      if (jobLockMap[name]) return
      jobLockMap[name] = true

      const end = di.metric.startTimer({
        name,
        interval: di.config.JOB_INTERVAL,
      })

      try {
        di.logger.debug('Job started', { name })
        await cb(handlerValue)
        end({ result: 'success' })
      } catch (error) {
        di.logger.warn('Job ended with error', error)
        end({ result: 'error' })
      } finally {
        jobLockMap[name] = false
        di.logger.debug('Job ended', { name })
      }
    }
    await handler(initial.start)
    setInterval(handler, di.config.JOB_INTERVAL, initial.pooling)
  }
}

