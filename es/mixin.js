import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';

export default {
  beforeCreate: function beforeCreate() {
    var _Object$assign, _Object$assign2;

    var name = this.$options.name;

    this.$options.computed = Object.assign({}, this.$options.computed, (_Object$assign = {}, _Object$assign[name] = function () {
      return this.$store.state[name].data;
    }, _Object$assign[name + 'RequestIsPending'] = function undefined() {
      return this.$store.state[name].isPending;
    }, _Object$assign));
    this.$options.methods = Object.assign({}, this.$options.methods, (_Object$assign2 = {}, _Object$assign2['getAsync' + upperFirst(camelCase(name))] = function undefined() {
      var _$store;

      (_$store = this.$store).dispatch.apply(_$store, [name + '/getAsync'].concat(Array.prototype.slice.call(arguments)));
    }, _Object$assign2));
  }
};