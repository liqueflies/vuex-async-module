export function getDefaultState () {
  return {
    isPending: true,
    statusCode: null,
    data: null,
    errors: null
  }
}

export function getDefaultTypes () {
  return {
    SET_RESPONSE_DATA: 'SET_RESPONSE_DATA',
    SET_IS_PENDING: 'SET_IS_PENDING',
    SET_STATUS_CODE: 'SET_STATUS_CODE',
    SET_ERRORS: 'SET_ERRORS'
  }
}

export function getDefaultMutations () {
  const types = getDefaultTypes()
  return {
    [types.SET_RESPONSE_DATA]: (state, data) => {
      state.data = data
      return state.data
    },
    [types.SET_IS_PENDING]: (state, isPending) => {
      state.isPending = isPending
      return state.isPending
    },
    [types.SET_STATUS_CODE]: (state, status) => {
      state.statusCode = status
      return state.statusCode
    },
    [types.SET_ERRORS]: (state, errors) => {
      state.errors = errors
      return state.errors
    }
  }
}

export function getDefaultActions (xhr) {
  const {
    SET_RESPONSE_DATA,
    SET_IS_PENDING,
    SET_STATUS_CODE,
    SET_ERRORS } = getDefaultTypes()
  return {
    getAsync ({ state, commit }, { url, forceUpdate = false }) {
      if (state.isPending || forceUpdate) {
        return xhr(url)
          .then(response => {
            commit(SET_RESPONSE_DATA, response.data)
            commit(SET_STATUS_CODE, response.status)
            commit(SET_IS_PENDING, false)
          })
          .catch(response => {
            commit(SET_ERRORS, response.errors)
            commit(SET_STATUS_CODE, response.status)
            commit(SET_IS_PENDING, false)
          })
      } else {
        return Promise.resolve(null)
      }
    }
  }
}

export default function getAsyncModule (options = {}) {
  const opts = Object.assign({}, options) // for extensibility
  if (opts.xhr === undefined) {
    throw new TypeError('You must provide a valid XHR transport library in `options.xhr`')
  }
  return {
    namespaced: true,
    state: getDefaultState(),
    mutations: getDefaultMutations(),
    actions: getDefaultActions(opts.xhr)
  }
}
