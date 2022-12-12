import * as v from './validators.js'
import { make, makeDeep } from './makers.js'

export * from './operators.js'
/**
 * Check unknown value is number
 * ```ts
 * const price = num(json.price)
 * ```
 * @param value - unknown number
 * @param {String | undefined} errorMessage - custom error message
 * @returns number
 */
export const num = make(v.num)
/**
 * Check unknown value is string
 * ```ts
 * const user = str(json.user)
 * ```
 * @param value - unknown string
 * @param {String | undefined} errorMessage - custom error message
 * @returns string
 */
export const str = make(v.str)
/**
 * Check unknown value is boolean
 * ```ts
 * const isAdmin = bool(json.isAdmin)
 * ```
 * @param value - unknown boolean
 * @param {String | undefined} errorMessage - custom error message
 * @returns boolean
 */
export const bool = make(v.bool)

export const level_attr = make(v.level_attr)
export const log_format = make(v.log_format)
/**
 * Check unknown value is object
 * ```ts
 * const user = obj(json.user, user => ({name: str(user.name)}))
 * ```
 * @param value - unknown object
 * @param castingCallback - callback for casting unknown object to data structure
 * @param {String | undefined} errorMessage - custom error message
 * @returns object with nested types
 */
export const obj = makeDeep(v.obj)
/**
 * Check unknown value is array
 * ```ts
 * const prices = arr(json.prices, prices => prices.map(num))
 * ```
 * @param value - unknown array
 * @param castingCallback - callback for casting unknown object to data structure
 * @param {String | undefined} errorMessage - custom error message
 * @returns array with nested types
 */
export const arr = makeDeep(v.arr)
