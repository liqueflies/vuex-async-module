import mixin from '../../src/mixin'

describe('vuex-async-module mixin', () => {
  test('should be an object', () => {
    expect(mixin).toEqual(expect.any(Object))
  })

  test('should have correct properties', () => {
    expect(mixin).toMatchObject({
      beforeCreate: expect.any(Function)
    })
  })
})
