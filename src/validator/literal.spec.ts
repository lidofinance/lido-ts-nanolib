import { optional, literal } from './index.js'

describe('literal', () => {
  test('string', () => {
    const expected = 'test' as const
    const value = 'test' as unknown
    expect(literal(expected, value)).toBe(expected)
  })
  test('number', () => {
    const expected = 1 as const
    const value = '1' as unknown
    expect(literal(expected, value)).toBe(expected)
  })
})

describe('literal optional', () => {
  test('string', () => {
    const expected = 'test' as const
    const value = 'test' as unknown
    expect(optional(() => literal(expected, value))).toBe(expected)
  })
  test('number', () => {
    const expected = 1 as const
    const value = '1' as unknown
    expect(optional(() => literal(expected, value))).toBe(expected)
  })
})
