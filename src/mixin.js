import { mapState, mapActions } from 'vuex'
import camelCase from 'lodash.camelcase'

export default {
  beforeCreate () {
    const { name } = this.$options
    this.$options.computed = Object.assign(
      {},
      this.$options.computed,
      mapState(name, {
        [name]: 'data',
        [`${name}RequestIsPending`]: 'isPending'
      })
    )
    this.$options.methods = Object.assign(
      {},
      this.$options.methods,
      mapActions(name, {
        [`getAsync${camelCase(name)}`]: 'getAsync'
      })
    )
  },

  beforeMount () {
    if (this.url === undefined) {
      throw new TypeError('You must provide a url property in `data` with your endpoint')
    } else {
      this[`getAsync${camelCase(this.$options.name)}`]({ url: this.url })
    }
  }
}
