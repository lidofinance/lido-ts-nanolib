import { ValidationError } from './errors.js'

export const make = <T>(
  parseFn: (input: unknown, errorMessage?: string | number) => T
) => {
  return (input?: unknown, errorMessage?: string | number) => {
    if (typeof input === 'undefined')
      throw new ValidationError(errorMessage, 'Empty value')
    return parseFn(input, errorMessage)
  }
}

export const makeDeep = <T>(
  parseFn: (input: unknown, errorMessage?: string) => T
) => {
  return <B>(input: unknown, cb: (arg: T) => B, errorMessage?: string) => {
    if (typeof input === 'undefined')
      throw new ValidationError(errorMessage || 'Empty value', input)
    try {
      return cb(parseFn(input, errorMessage))
    } catch (error) {
      throw new ValidationError(error.message, input)
    }
  }
}
