import { getDefaultTypes } from '../../src/index'

describe('getDefaultTypes', () => {
  test('should be defined', () => {
    expect(getDefaultTypes).toBeDefined()
  })

  test('should be a function', () => {
    expect(getDefaultTypes).toEqual(expect.any(Function))
  })

  test('should return an object', () => {
    expect(getDefaultTypes()).toEqual(expect.any(Object))
  })

  test('should return an object that contains the correct properties', () => {
    const types = {
      SET_RESPONSE_DATA: 'SET_RESPONSE_DATA',
      SET_IS_PENDING: 'SET_IS_PENDING',
      SET_STATUS_CODE: 'SET_STATUS_CODE',
      SET_ERRORS: 'SET_ERRORS'
    }
    expect(getDefaultTypes()).toEqual(types)
  })

  test('should return an object that have all the same properties', () => {
    const state = getDefaultTypes()
    expect(getDefaultTypes()).toEqual(state)
  })

  test('should return an object that is not exact same state', () => {
    const state = getDefaultTypes()
    expect(getDefaultTypes()).not.toBe(state)
  })
})
