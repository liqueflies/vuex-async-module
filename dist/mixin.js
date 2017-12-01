'use strict';

exports.__esModule = true;

var _vuex = require('vuex');

var _lodash = require('lodash.camelcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.upperfirst');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  beforeCreate: function beforeCreate() {
    var _mapState, _mapActions;

    var name = this.$options.name;

    this.$options.computed = Object.assign({}, this.$options.computed, (0, _vuex.mapState)(name, (_mapState = {}, _mapState[name] = 'data', _mapState[name + 'RequestIsPending'] = 'isPending', _mapState)));
    this.$options.methods = Object.assign({}, this.$options.methods, (0, _vuex.mapActions)(name, (_mapActions = {}, _mapActions['getAsync' + (0, _lodash4.default)((0, _lodash2.default)(name))] = 'getAsync', _mapActions)));
  }
};
module.exports = exports['default'];