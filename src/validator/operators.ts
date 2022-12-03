import { make } from './makers.js'

export const optional = (cb: ReturnType<typeof make>) => {
  try {
    return cb()
  } catch (error) {
    return
  }
}

type Fn<T> = (arg: T) => T
type Chain<T> = Fn<T>[]
// export const chain = <T>(arg: T, ...fns: Chain<T>) => {
//   for (let i = fns.length - 1; i >= 0; i--) {
//     arg = fns[i](arg)
//   }
//   return arg
// }
export const chain = <T>(arg: T, ...fns: Chain<T>) =>
  fns.reduce((acc, fn) => fn(acc), arg)
