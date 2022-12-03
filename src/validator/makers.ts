import { ValidationError } from './errors.js'

export const make = <T>(
  parseFn: (input: unknown, errorMessage?: string | number) => T
) => {
  return (str?: unknown, errorMessage?: string | number) => {
    if (typeof str === 'undefined')
      throw new ValidationError(
        typeof errorMessage === 'undefined' || typeof errorMessage === 'number'
          ? 'Empty value'
          : errorMessage
      )
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

export const makeOptionalDeep = <T>(
  parseFn: (input: unknown, errorMessage?: string) => T
) => {
  return <B>(str: unknown, cb: (arg: T) => B, errorMessage?: string) => {
    try {
      if (typeof str === 'undefined')
        throw new ValidationError(errorMessage || 'Empty value')

      return cb(parseFn(str, errorMessage))
    } catch (_) {}
  }
}

export const makeOptional = <T>(parseFn: (input: unknown) => T) => {
  return (str?: unknown, cb?: <A>(arg: T) => A) => {
    if (typeof str === 'undefined') return
    try {
      if (cb) return cb(parseFn(str))
      return parseFn(str)
    } catch (_) {}
  }
}
