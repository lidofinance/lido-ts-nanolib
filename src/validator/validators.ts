import { ValidationError } from './errors.js'
import type { LogLevelsUnion } from '../logger/types'

export const num = (input: unknown, errorMessage?: string) => {
  if (!Number.isNaN(input) && typeof input === 'string')
    return parseFloat(input)
  if (!Number.isNaN(input) && typeof input === 'number') return input
  throw new ValidationError(errorMessage || `Invalid number input: "${input}"`)
}

export const str = (input: unknown, errorMessage?: string) => {
  if (typeof input === 'string') return input
  throw new ValidationError(errorMessage || `Not a string: "${input}"`)
}

export const bool = (input: unknown | boolean, errorMessage?: string) => {
  switch (input) {
    case true:
    case 'true':
      return true
    case false:
    case 'false':
      return false
    default:
      throw new ValidationError(
        errorMessage || `Invalid bool input: "${input}"`
      )
  }
}

const isLevelAttr = (input: string): input is LogLevelsUnion =>
  ['debug', 'info', 'log', 'warn', 'error'].includes(input)

export const level_attr = (input: unknown, errorMessage?: string) => {
  const string = str(input)
  if (isLevelAttr(string)) return string
  throw new ValidationError(errorMessage || `Invalid level input: "${input}"`)
}

export const obj = (input: unknown, errorMessage?: string) => {
  if (typeof input === 'object' && !Array.isArray(input) && input !== null) {
    return input as Record<string | number | symbol, unknown>
  }
  throw new ValidationError(errorMessage || `Invalid object input: "${input}"`)
}

export const arr = (input: unknown, errorMessage?: string) => {
  if (typeof input === 'object' && Array.isArray(input)) {
    return input as unknown[]
  }
  throw new ValidationError(errorMessage || `Invalid array input: "${input}"`)
}
