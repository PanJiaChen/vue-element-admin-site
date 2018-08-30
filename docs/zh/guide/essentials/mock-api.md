# Mock Data

Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发所阻塞。

## Swagger

我司项目中通常使用 [swagger](https://swagger.io/) 由后端来模拟数据。
**swagger** 是一个 REST APIs 文档生成工具，可以跨平台从代码注释中自动生成，开源，支持大部分语言，社区好，总之非常不错，强烈推荐。
[线上 demo](http://petstore.swagger.io/?_ga=2.222649619.983598878.1509960455-2044209180.1509960455#/pet/addPet)

## Easy-Mock

[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) 使用的是 [easy-mock](https://easy-mock.com/login) 来模拟数据。
它是一个纯前端可视化，并且能快速生成模拟数据的持久化服务。非常的简单易用还能结合 `swagger`，支持跨域 ，不管团队还是个人项目都值得一试。

## Mockjs

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 由于是一个纯前端个人项目，所有的数据都是用 [mockjs](https://github.com/nuysoft/Mock) 本地生成模拟出来的，它的原理是:拦截了所有的请求并代理到本地模拟数据，所以 network 中没有发出任何的请求。

如需改造本项目，去除 mockjs 也很简单。

所有的 mock 数据都在 `@/src/mock` 目录下，它只会拦截 `@/src/mock/index.js` 文件中拦截的 url。

**移除**只需要在 `@/src/main.js` 中移除 `import './mock'` 并且删除 `@/src/mock` 文件夹即可。

## 本地 Mock 与线上切换

有很多时候我们会遇到本地使用 mock 数据，线上环境使用真实数据。

- **Easy-Mock 的形式**

你需要保证你本地模拟 api 除了根路径其它的地址是一致的。
比如：

```
https://api-dev/login   // 本地请求

https://api-prod/login  // 线上请求
```

我们可以通过之后会介绍的[环境变量](/zh/guide/essentials/deploy.html#环境变量)来做到不同环境下，请求不同的 api 地址。

```js
//dev.env.js
module.exports = {
  BASE_API: '"https://api-dev"' //注入本地api的根路径
}
```

```js
//prod.env.js
module.exports = {
  BASE_API: '"https://api-prod"' //注入线上api的根路径
}
```

之后根据环境变量创建`axios`实例，让它具有不同的`baseURL`。 [@/utils/request.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/request.js)

```js
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})
```

这样我们就做到了自动根据环境变量切换本地和线上 api。

- **Mock.js 的切换**

当我们本地使用 `Mock.js` 模拟本地数据，线上使用真实环境 api 方法。这与上面的 easy-mock 的方法是差不多的。我们主要是判断：是线上环境的时候，不引入 mock 数据就可以了，只有在本地引入 `Mock.js`。

```js
//main.js
if (process.env.NODE_ENV === 'development') {
  require('./mock') // simulation data
}
```

只有在本地环境之中才会引入 mock 数据。
