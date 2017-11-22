import { getDefaultMutations, getDefaultTypes } from '../../src/index'

describe('getDefaultMutations', () => {
  test('should be defined', () => {
    expect(getDefaultMutations).toBeDefined()
  })

  test('should be a function', () => {
    expect(getDefaultMutations).toEqual(expect.any(Function))
  })

  test('should return an object', () => {
    expect(getDefaultMutations()).toEqual(expect.any(Object))
  })

  test('should return an object that contains the correct properties', () => {
    const types = getDefaultTypes()
    expect(getDefaultMutations()).toMatchObject({
      [types.SET_RESPONSE_DATA]: expect.any(Function),
      [types.SET_IS_PENDING]: expect.any(Function),
      [types.SET_STATUS_CODE]: expect.any(Function),
      [types.SET_ERRORS]: expect.any(Function)
    })
  })
})

describe('getDefaultMutations lifecycle', () => {
  let result
  let state

  const types = getDefaultTypes()

  test('should update successfully state with pending result', () => {
    state = { isPending: true }
    result = false

    const rsp = getDefaultMutations()[types.SET_IS_PENDING](state, result)
    expect(rsp).toBe(result)
  })

  test('should update successfully state with response payload result', () => {
    state = { data: null }
    result = {}

    const rsp = getDefaultMutations()[types.SET_RESPONSE_DATA](state, result)
    expect(rsp).toBe(result)
  })

  test('should update successfully state with status code result', () => {
    state = { statusCode: null }
    result = 400

    const rsp = getDefaultMutations()[types.SET_STATUS_CODE](state, result)
    expect(rsp).toBe(result)
  })

  test('should update successfully state with given error result', () => {
    state = { errors: null }
    result = new Error('my error')

    const rsp = getDefaultMutations()[types.SET_ERRORS](state, result)
    expect(rsp).toBe(result)
  })
})
