import * as v from './validators.js'
import { make, makeOptional, makeDeep, makeOptionalDeep } from './makers.js'

export * from './operators.js'

export const num = make(v.num)
export const optional_num = makeOptional(v.num)

export const str = make(v.str)
export const optional_str = makeOptional(v.str)

export const bool = make(v.bool)
export const optional_bool = makeOptional(v.bool)

export const level_attr = make(v.level_attr)
export const optional_level_attr = makeOptional(v.level_attr)

export const obj = makeDeep(v.obj)
export const optional_obj = makeOptionalDeep(v.obj)

export const arr = makeDeep(v.arr)
export const optional_arr = makeOptionalDeep(v.arr)
