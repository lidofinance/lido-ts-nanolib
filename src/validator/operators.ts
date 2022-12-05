import { ValidationError } from './errors'

export const optional = <T>(cb: () => T) => {
  try {
    return cb()
  } catch (_) {
    return
  }
}

export const wrap = <T>(cb: () => T, errorMessage?: string) => {
  try {
    return cb()
  } catch (error) {
    throw new ValidationError(errorMessage || error.message)
  }
}

type Fn<T> = (arg: T) => T
type Chain<T> = Fn<T>[]

export const pipe = <T>(arg: T, ...fns: Chain<T>) =>
  fns.reduce((acc, fn) => fn(acc), arg)

interface WithLength {
  length: number
}
export const min_length = (len: number, errorMessage?: string) => {
  function check_length<T extends WithLength>(arg: T): T
  function check_length<T>(arg: T extends string ? T : T[]) {
    if (arg.length > len) throw new ValidationError(errorMessage || 'Invalid length')
    return arg
  }
  return check_length
}