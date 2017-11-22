import { getDefaultState } from '../../src/index'

describe('getDefaultState', () => {
  test('getDefaultState should be defined', () => {
    expect(getDefaultState).toBeDefined()
  })

  test('getDefaultState should be a function', () => {
    expect(getDefaultState).toEqual(expect.any(Function))
  })

  test('should return an object', () => {
    expect(getDefaultState()).toEqual(expect.any(Object))
  })

  test('should return an object that contains the right keys', () => {
    const state = {
      isPending: true,
      statusCode: null,
      data: null,
      errors: null
    }
    expect(getDefaultState()).toEqual(state)
  })

  test('should return an object that have all the same properties', () => {
    const state = getDefaultState()
    expect(getDefaultState()).toEqual(state)
  })

  test('should return an object that is not exact same state', () => {
    const state = getDefaultState()
    expect(getDefaultState()).not.toBe(state)
  })
})
