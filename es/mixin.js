import { mapState, mapActions } from 'vuex';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';

export default {
  beforeCreate: function beforeCreate() {
    var _mapState, _mapActions;

    var name = this.$options.name;

    this.$options.computed = Object.assign({}, this.$options.computed, mapState(name, (_mapState = {}, _mapState[name] = 'data', _mapState[name + 'RequestIsPending'] = 'isPending', _mapState)));
    this.$options.methods = Object.assign({}, this.$options.methods, mapActions(name, (_mapActions = {}, _mapActions['getAsync' + upperFirst(camelCase(name))] = 'getAsync', _mapActions)));
  }
};