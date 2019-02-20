# Mock Data

Mock data is an integral part of the front-end development, the key link to separate the front and back-end development. By pre-agreed with the server-side interface, analog request data and even logic, can make the front-end development independent, will not be blocked by the development of the server.

## Swagger

In my company project, the data is usually simulated by the backend using [swagger](https://swagger.io/).
`swagger`it is a REST APIs document generation tool that can cross-platform automatically generated from code comments, open source, support most of the language, the community is good. In short, it is very good and strongly recommended.

[Online Demo](http://petstore.swagger.io/?_ga=2.222649619.983598878.1509960455-2044209180.1509960455#/pet/addPet)

## Easy-mock

[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) uses [easy-mock](https://easy-mock.com/login) to simulate the data.
It is a pure front-end visualization, and can quickly generate simulation data persistence services. It's very easy to use and can be combined with `swagger`, support cors. It's worth a try for both the team and the individual project.

[Online Demo](https://easy-mock.com/)

::: warning
Now the online version of `vue-admin-template` has used `mock.js` instead of `easy-mock`. Because the online free service provided by `easy-mock` is very unstable, it will often hang from time to time. If you need it, you can follow the tutorial and build your own service.
:::

## Mockjs

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) is a purely front-end personal project, so all the data is generated locally by [mockjs](https://github.com/nuysoft/Mock). Its principle is: intercept all requests and proxy to local simulation data, so no network sends any request.

If you need to remove it is easy.

All mock data is in the `@/src/mock` directory. It will only intercept the url you declared in `@/src/mock/index.js`.

**Remove:** Just remove `import '/Mock'` from`@/src/main.js` and delete the `@/src/mock` folder.

<br>

## Switch from mock directly to server request

There are many times when we encounter, local use of mock data, and the online environment uses real data.

- **Easy-Mock**

You need to ensure that your local simulated api is consistent with all other addresses except the root path.
such as:

```
https://api-dev/login   // Local request

https://api-prod/login  // Online request
```

We can use the [environment variables](/guide/essentials/deploy.html#environmental-variables) to do different environments and request different api base path.

```js
//dev.env.js
module.exports = {
  // Inject the base path of the local API
  BASE_API: '"https://api-dev"'
}
```

```js
//prod.env.js
module.exports = {
  // Inject the base path of the production API
  BASE_API: '"https://api-prod"'
}
```

Then create an `axios` instance based on the environment variable to have a different `baseURL`.
[@/utils/request.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/request.js)

```js
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // base_url of the API
  timeout: 5000 // request timeout
})
```

In this way we can automatically switched local and online apis based on environment variables.

- **Mock.js**

When we use `Mock.js` to simulate data locally, the real-world api method is used online. This is similar to the easy-mock method above. We mainly judge that when it is an online environment, we use real-world api. We only import `Mock.js` locally.

```js
//main.js
if (process.env.NODE_ENV === 'development') {
  require('./mock') // simulation data
}
```

Mock data is only import in the local environment.
