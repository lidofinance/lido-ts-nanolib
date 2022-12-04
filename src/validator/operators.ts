export const optional = <T>(cb: () => T) => {
  try {
    return cb()
  } catch (_) {
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
interface WithLength {
  length: number
}
export const min_length = (len: number) => {
  function check_length<T extends WithLength>(arg: T): T
  function check_length<T>(arg: T extends string ? T : T[]) {
    if (arg.length > len) throw new Error('ssss')
    return arg
  }
  return check_length
}

const concat_arr = <T>(val: T) => {
  return (arg: T[]) => {
    //   const arr = arg as T extends T[] ? T[] : never
    //   arg.push(val)
    return [...arg, val]
  }
}

