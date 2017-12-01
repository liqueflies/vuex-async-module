import { mapState, mapActions } from 'vuex'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'

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
        [`getAsync${upperFirst(camelCase(name))}`]: 'getAsync'
      })
    )
  }
}
