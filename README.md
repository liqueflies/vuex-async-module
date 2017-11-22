# vuex-async-module

> Reduce async boilerplate code generating [Vuex](http://vuex.vuejs.org) modules. Compatible with Vue 2.x

## Installation
``` bash
  npm install vuex-async-module --save
  # or
  yarn add vuex-async-module
```

## Introduction

`vuex-async-module` generates [Vuex Modules](https://vuex.vuejs.org/en/modules.html) reducing boilerplate for asynchronous request, inspired by this [post](https://medium.com/@lachlanmiller_52885/reducing-vuex-boilerplate-for-ajax-calls-1cd4a74cef26) of [Lachlan Miller](https://twitter.com/Lachlan06036367).

### Behind the idea

The workflow for a successful asynchronous request should be like:

```js
state = {
  isPending: true // pending... show a spinner
  statusCode: null, 
  data: null,
  errors: null
}
// some time later... the ajax request is successful
state = {
  isPending: false,  // no longer pending
  statusCode: 200, // success code 200
  data: {...}, // response data
  errors: null // no errors   
}
```

Standard Vuex code should write also `types`, `actions`, `mutations`, and `getters` for each async action.

We can notice that in many cases we will write the same code over and over again.

`vuex-async-module` will scaffold this code for you.

## Basic usage

```js
import getAsyncModule from 'vuex-async-module'

export default new Vuex.Store({
  state, // your state,
  actions, // your actions
  getters, // your getters
  mutations, // your mutations
  modules: {
    // use a promise async library that return data and status on response
    movies: getAsyncModule({ xhr: axios.get })
  }
})
```

and then in your `.vue`

```js
import asyncMixin from 'vuex-async-module/src/mixin'

export default {
  // component `name` is the same as module name
  name: 'movies',
  // data should have url for the async call
  data: function () {
    url: 'https://ghibliapi.herokuapp.com/films'
  },
  // include mixin for automatically bind two computed props:
  // [componentName]RequestIsPending i.e moviesRequestIsPending
  // [componentName] i.e. movies
  // and a method!
  // getAsync[componentName] i.e. getAsyncMovies(url, forceUpdate)
  mixins: [asyncMixin]
}
```

and in the template

```html
<div v-if="moviesRequestIsPending" />
<ul v-else>
  <li v-for="movie in movies" :key="movie.id">
    <h2> {{ movie.title }} - {{ movie.release_date }} </h2>
  </li>
</ul>
```

## Documentation

`vuex-async-module` has two conventions
- `component` name must be the same of `module` name.
- your data with `url` must contain the endpoint for the ajax call.


`vuex-async-module` mixin adds two `computed` properties:

- [`componentName`]RequestIsPending - i.e `moviesRequestIsPending`
- [`componentName`] - i.e. `movies`

and a `method`

- getAsync[`componentName`] i.e. getAsyncMovies

`getAsync` expects to receive the url for the ajax call, and a boolean parameter to force the update of the previous fetched data.

And the job is done!

## Contributors

Thanks to [Marco Solazzi](https://github.com/dwightjack) and [Giovanni Rodighiero](https://github.com/giovanniRodighiero).

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Lorenzo Girardi