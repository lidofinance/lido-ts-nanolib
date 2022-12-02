import { ValidationError } from './errors.js'
import * as v from './validators.js'

export const make = <T>(
  parseFn: (input: unknown, errorMessage?: string | number) => T
) => {
  return (str?: unknown, errorMessage?: string| number) => {
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

export const makeOptional = <T>(parseFn: (input: unknown) => T) => {
  return (str?: unknown, cb?: <A>(arg: T) => A) => {
    if (typeof str === 'undefined') return
    try {
      if (cb) return cb(parseFn(str))
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

export const obj = makeDeep(v.obj)
export const optional_obj = makeOptional(v.obj)

export const arr = makeDeep(v.arr)
export const optional_arr = makeOptional(v.arr)


const obje = {
  title: str(obj, 'Empty title'),
  user: obj('sdasdasd', (user) => ({
    name: str(user.name),
    surname: str(user.surname),
  })),
  projectNames: arr(str, (p) => p.map(str), 'Invalid array project'),
}
const s = str('')
obje.user.name
