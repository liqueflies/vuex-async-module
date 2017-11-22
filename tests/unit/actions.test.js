import { getDefaultActions, getDefaultTypes } from '../../src/index'

describe('getDefaultActions', () => {
  test('should be defined', () => {
    expect(getDefaultActions).toBeDefined()
  })

  test('should be a function', () => {
    expect(getDefaultActions).toEqual(expect.any(Function))
  })

  test('should return an function', () => {
    expect(getDefaultActions()).toEqual(expect.any(Object))
  })

  test('should return an object that contains the correct properties', () => {
    expect(getDefaultActions(() => {})).toMatchObject({
      getAsync: expect.any(Function)
    })
  })
})

describe('getDefaultActions lifecycle', () => {
  let mockRequestSuccess
  let mockRequestError
  let commit
  let state

  const successResponse = { status: 200, data: Object.assign({}) }
  const error = { errors: new Error('my error'), status: 500 }
  const types = getDefaultTypes()
  const url = ''

  beforeEach(() => {
    // https://facebook.github.io/jest/docs/en/mock-functions.html
    mockRequestSuccess = jest.fn((url) => Promise.resolve(successResponse))
    mockRequestError = jest.fn((url) => Promise.reject(error))
    commit = jest.fn()
    state = { isPending: true }
  })

  test('returns a promise-like interface', () => {
    const { getAsync } = getDefaultActions(mockRequestSuccess)
    const resp = getAsync({ commit, state }, { url })

    expect(resp.then).toEqual(expect.any(Function))
    expect(resp.catch).toEqual(expect.any(Function))
  })

  test('returned promise should resolve to a `null` value if data was already loaded', (done) => {
    const { getAsync } = getDefaultActions(mockRequestSuccess)
    state = { isPending: false }
    const resp = getAsync({ commit, state }, { url })

    expect(resp.then((res) => {
      expect(res).toBeNull()
      done()
    }))
  })

  test('commits pending to `false` on success', (done) => {
    const { getAsync } = getDefaultActions(mockRequestSuccess)
    const resp = getAsync({ commit, state }, { url })

    resp.then(() => {
      expect(commit).toBeCalledWith(types.SET_IS_PENDING, false)
      done()
    })
  })

  test('commits statusCode on success', (done) => {
    const { getAsync } = getDefaultActions(mockRequestSuccess)
    const resp = getAsync({ commit, state }, { url })

    resp.then(() => {
      expect(commit).toBeCalledWith(types.SET_STATUS_CODE, successResponse.status)
      done()
    })
  })

  test('commits response data on success', (done) => {
    const { getAsync } = getDefaultActions(mockRequestSuccess)
    const resp = getAsync({ commit, state }, { url })

    resp.then(() => {
      expect(commit).toBeCalledWith(types.SET_RESPONSE_DATA, successResponse.data)
      done()
    })
  })

  test('commits response error on failure', (done) => {
    const { getAsync } = getDefaultActions(mockRequestError)
    const resp = getAsync({ commit, state }, { url })

    resp.then(() => {
      expect(commit).toBeCalledWith(types.SET_ERRORS, error.errors)
      done()
    })
  })

  test('commits statusCode error on failure', (done) => {
    const { getAsync } = getDefaultActions(mockRequestError)
    const resp = getAsync({ commit, state }, { url })

    resp.then(() => {
      expect(commit).toBeCalledWith(types.SET_STATUS_CODE, error.status)
      done()
    })
  })

  test('commits pending to `false` on failure', (done) => {
    const { getAsync } = getDefaultActions(mockRequestError)
    const resp = getAsync({ commit, state }, { url })

    resp.then(() => {
      expect(commit).toBeCalledWith(types.SET_IS_PENDING, false)
      done()
    })
  })
})
