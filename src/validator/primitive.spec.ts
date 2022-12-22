import { str, num, bool } from './index.js'

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
})
