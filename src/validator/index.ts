import * as v from './validators.js'
import { make, makeOptional, makeDeep, makeOptionalDeep } from './makers.js'

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

const validateResponse = (json: unknown) =>
  obj(json, (object) => ({
    title: str(object.title, 'Empty title'),
    user: obj(object.user, (user) => ({
      name: str(user.name),
      surname: str(user.surname),
    })),
    projectNames: arr(
      object.projectNames,
      (p) => p.map(str),
      'Invalid array project'
    ),
  }))

const obje = {
  title: str(obj, 'Empty title'),
  user: optional_obj('sdasdasd', (user) => ({
    name: str(user.name),
    surname: str(user.surname),
  })),
  projectNames: arr(str, (p) => p.map(str), 'Invalid array project'),
}
const s = str('')
if (obje.user) {
  obje.user.name
}
