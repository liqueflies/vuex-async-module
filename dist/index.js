'use strict';

exports.__esModule = true;
exports.asyncModuleMixin = undefined;
exports.getDefaultState = getDefaultState;
exports.getDefaultTypes = getDefaultTypes;
exports.getDefaultMutations = getDefaultMutations;
exports.getDefaultActions = getDefaultActions;
exports.default = getAsyncModule;

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.asyncModuleMixin = _mixin2.default;
function getDefaultState() {
  return {
    isPending: true,
    statusCode: null,
    data: null,
    errors: null
  };
}

function getDefaultTypes() {
  return {
    SET_RESPONSE_DATA: 'SET_RESPONSE_DATA',
    SET_IS_PENDING: 'SET_IS_PENDING',
    SET_STATUS_CODE: 'SET_STATUS_CODE',
    SET_ERRORS: 'SET_ERRORS'
  };
}

function getDefaultMutations() {
  var _ref;

  var types = getDefaultTypes();
  return _ref = {}, _ref[types.SET_RESPONSE_DATA] = function (state, data) {
    state.data = data;
    return state.data;
  }, _ref[types.SET_IS_PENDING] = function (state, isPending) {
    state.isPending = isPending;
    return state.isPending;
  }, _ref[types.SET_STATUS_CODE] = function (state, status) {
    state.statusCode = status;
    return state.statusCode;
  }, _ref[types.SET_ERRORS] = function (state, errors) {
    state.errors = errors;
    return state.errors;
  }, _ref;
}

function getDefaultActions(xhr) {
  var _getDefaultTypes = getDefaultTypes(),
      SET_RESPONSE_DATA = _getDefaultTypes.SET_RESPONSE_DATA,
      SET_IS_PENDING = _getDefaultTypes.SET_IS_PENDING,
      SET_STATUS_CODE = _getDefaultTypes.SET_STATUS_CODE,
      SET_ERRORS = _getDefaultTypes.SET_ERRORS;

  return {
    getAsync: function getAsync(_ref2, _ref3) {
      var state = _ref2.state,
          commit = _ref2.commit;
      var url = _ref3.url,
          _ref3$forceUpdate = _ref3.forceUpdate,
          forceUpdate = _ref3$forceUpdate === undefined ? false : _ref3$forceUpdate;

      if (state.isPending || forceUpdate) {
        return xhr(url).then(function (response) {
          commit(SET_RESPONSE_DATA, response.data);
          commit(SET_STATUS_CODE, response.status);
          commit(SET_IS_PENDING, false);
        }).catch(function (response) {
          commit(SET_ERRORS, response.errors);
          commit(SET_STATUS_CODE, response.status);
          commit(SET_IS_PENDING, false);
        });
      } else {
        return Promise.resolve(null);
      }
    }
  };
}

function getAsyncModule() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = Object.assign({}, options); // for extensibility
  if (opts.xhr === undefined) {
    throw new TypeError('You must provide a valid XHR transport library in `options.xhr`');
  }
  return {
    namespaced: true,
    state: getDefaultState(),
    mutations: getDefaultMutations(),
    actions: getDefaultActions(opts.xhr)
  };
}