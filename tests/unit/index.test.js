import getAsyncModule from '../../src/index'

describe('getAsyncModule', () => {
  test('should be defined', () => {
    expect(getAsyncModule).toBeDefined()
  })

  test('should be a function', () => {
    expect(getAsyncModule).toEqual(expect.any(Function))
  })

  test('throws on xhr options missing', () => {
    expect(getAsyncModule).toThrow()
  })

  test('should return an object', () => {
    expect(getAsyncModule({ xhr: Promise.resolve })).toEqual(expect.any(Object))
  })

  test('object should have valid properties', () => {
    expect(getAsyncModule({ xhr: Promise.resolve })).toMatchObject({
      namespaced: true,
      state: expect.any(Object),
      mutations: expect.any(Object),
      actions: expect.any(Object)
    })
  })
})
