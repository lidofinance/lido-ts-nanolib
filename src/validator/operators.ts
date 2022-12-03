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
// export const chain =
//   <T>(...fns: Chain<T>) =>
//   <B>(arg: B extends T ? B : never) =>
//     fns.reduce((acc, fn) => fn(acc), arg)
export const chain =
  <T>(...fns: Chain<T>) =>
  (arg: T) =>
    fns.reduce((acc, fn) => fn(acc), arg)

export const pipe = <T>(arg: T, ...fns: Chain<T>) =>
  fns.reduce((acc, fn) => fn(acc), arg)
// export const or =
//   <L, R>(left: Fn<L>, right: Fn<R>) =>
//   (arg: L | R): L | R => {
//     const errors = []
//   }
const min_length = (len: number) => {
  return <T>(arg: T extends string ? T : T[]) => {
    if (arg.length > len) throw new Error('ssss')
    return arg
  }
}

const concat_arr = <T>(val: T) => {
  return (arg: T[]) => {
    //   const arr = arg as T extends T[] ? T[] : never
    //   arg.push(val)
    return [...arg, val]
  }
}

// const concat_arr = (len: number) => {
//   return (arg: (number | string)[]) => ([...arg, 4])
// }

const chain1 = chain(min_length(2))([1, 2, 3])
const chain2 = chain(min_length(2))('sssss')
const chain3 = chain(concat_arr(2))([1, 2, 3])

const pipe1 = pipe({kek: 1}, (numbers) => numbers)
// const pipe2 = pipe(min_length(2))('sssss')
// const pipe3 = pipe(concat_arr(2))([1, 2, 3])
// const aaa = chain(<T extends number[] ? T : never>(arr: T) => [...arr, 4])([1, 2, 3])