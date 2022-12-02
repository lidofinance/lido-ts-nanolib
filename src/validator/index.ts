import { ValidationError } from './errors.js'
import * as v from './validators.js'

export const make = <T>(
  parseFn: (input: unknown, errorMessage?: string) => T
) => {
  return (str?: unknown, errorMessage?: string) => {
    if (typeof str === 'undefined') throw new ValidationError(errorMessage || 'Empty value')
    return parseFn(str, errorMessage)
  }
}

export const makeOptional = <T>(parseFn: (input: unknown) => T) => {
  return (str?: unknown) => {
    if (typeof str === 'undefined') return
    try {
      return parseFn(str)
    } catch (_) {}
  }
}

export const num = make(v.num)
export const optional_num = makeOptional(v.num)

export const str = make(v.str)
export const optional_str = makeOptional(v.str)

export const bool = make(v.bool)
export const optional_bool = makeOptional(v.bool)

export const level_attr = make(v.level_attr)
export const optional_level_attr = makeOptional(v.level_attr)

export const obj = make(v.obj)
export const optional_obj = makeOptional(v.obj)

export const arr = make(v.arr)
export const optional_arr = makeOptional(v.arr)
