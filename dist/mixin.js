'use strict';

exports.__esModule = true;

var _lodash = require('lodash.camelcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.upperfirst');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  beforeCreate: function beforeCreate() {
    var _Object$assign, _Object$assign2;

    var name = this.$options.name;

    this.$options.computed = Object.assign({}, this.$options.computed, (_Object$assign = {}, _Object$assign[name] = function () {
      return this.$store.state[name].data;
    }, _Object$assign[name + 'RequestIsPending'] = function undefined() {
      return this.$store.state[name].isPending;
    }, _Object$assign));
    this.$options.methods = Object.assign({}, this.$options.methods, (_Object$assign2 = {}, _Object$assign2['getAsync' + (0, _lodash4.default)((0, _lodash2.default)(name))] = function undefined() {
      var _$store;

      (_$store = this.$store).dispatch.apply(_$store, [name + '/getAsync'].concat(Array.prototype.slice.call(arguments)));
    }, _Object$assign2));
  }
};
module.exports = exports['default'];