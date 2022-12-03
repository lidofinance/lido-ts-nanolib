import { str, num, bool, obj, arr } from './index.js'

describe('data casting', () => {
  test('string', () => {
    const value = '1' as unknown
    expect(str(value)).toBe('1')
  })
  test('number', () => {
    const value = '1' as unknown
    expect(num(value)).toBe(1)
  })
  test('boolean as string', () => {
    const value = 'true' as unknown
    expect(bool(value)).toBe(true)
  })
  test('boolean as boolean', () => {
    const value = true as unknown
    expect(bool(value)).toBe(true)
  })
  test('object', () => {
    const value = { test: { some: { value: 'here' } } } as unknown
    const cast = obj(value, (value) => ({
      test: obj(value.test, (test) => ({
        some: obj(test.some, (some) => ({ value: str(some.value) })),
      })),
    }))
    expect(cast.test.some.value).toBe('here')
  })

  test('array numbers', () => {
    const value = [1, 2, 3] as unknown
    const cast = arr(value, (array) => array.map(num))
    expect(cast).toStrictEqual([1, 2, 3])
  })

  test('array strings', () => {
    const value = ['1', '2', '3'] as unknown
    const cast = arr(value, (array) => array.map(str))
    expect(cast).toStrictEqual(['1', '2', '3'])
  })
})
