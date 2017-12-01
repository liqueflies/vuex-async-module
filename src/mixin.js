import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'

export default {
  beforeCreate () {
    const { name } = this.$options
    this.$options.computed = Object.assign(
      {},
      this.$options.computed,
      {
        [name]: function () {
          return this.$store.state[name].data
        },
        [`${name}RequestIsPending`]: function () {
          return this.$store.state[name].isPending
        }
      }
    )
    this.$options.methods = Object.assign(
      {},
      this.$options.methods,
      {
        [`getAsync${upperFirst(camelCase(name))}`]: function () {
          this.$store.dispatch(`${name}/getAsync`, ...arguments)
        }
      }
    )
  }
}
