import { makeError, ValidationError } from './errors.js'

export const make = <T>(
  parseFn: (input: unknown, errorMessage?: string | number) => T
) => {
  return (str?: unknown, errorMessage?: string | number) => {
    if (typeof str === 'undefined') makeError(errorMessage, 'Empty value')
    return parseFn(str, errorMessage)
  }
}

export const makeDeep = <T>(
  parseFn: (input: unknown, errorMessage?: string) => T
) => {
  return <B>(str: unknown, cb: (arg: T) => B, errorMessage?: string) => {
    if (typeof str === 'undefined')
      throw new ValidationError(errorMessage || 'Empty value')

    return cb(parseFn(str, errorMessage))
  }
}
