import Vue from 'vue'
import mixin from '../../src/mixin'

describe('vuex-async-module mixin', () => {
  test('should be an object', () => {
    expect(mixin).toEqual(expect.any(Object))
  })

  test('should have correct properties', () => {
    expect(mixin).toMatchObject({
      beforeCreate: expect.any(Function),
      beforeMount: expect.any(Function)
    })
  })
})

describe('vuex-async-module mixin beforeMount lifecycle', () => {
  const render = function () {
    return null
  }

  // const data = function () {
  //   return {
  //     url: 'https://ghibliapi.herokuapp.com/films'
  //   }
  // }

  test('should throw error if no url present', () => {
    const movies = Vue.component('movies', {
      mixins: [mixin],
      render
    })

    expect(new Vue(movies).$mount).toThrow()
  })
})
