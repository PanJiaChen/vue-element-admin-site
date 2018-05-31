# Mock Data
Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发所阻塞。

## Swagger
我司项目中通常使用 [swagger](https://swagger.io/) 由后端来模拟数据。
**swagger** 是一个 REST APIs 文档生成工具，可以跨平台从代码注释中自动生成，开源，支持大部分语言，社区好，总之非常不错，强烈推荐。
[线上demo](http://petstore.swagger.io/?_ga=2.222649619.983598878.1509960455-2044209180.1509960455#/pet/addPet)

## Easy-mock
[vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template) 使用的是 [easy-mock](https://easy-mock.com/login) 来模拟数据。
它是一个纯前端可视化，并且能快速生成 模拟数据 的持久化服务。非常的简单易用还能结合 `swagger` ，不管团队还是个人项目都值得一试。

## Mockjs
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 由于是一个纯前端个人项目，所以所以的数据都是用    [mockjs](https://github.com/nuysoft/Mock) 生成的，它的原理是:拦截了所有的请求并代理到本地模拟数据，所以 network 中没有发出任何的请求发出。

如需改造本项目，去除mockjs也很简单。

所有的mock数据都在 `src/mock` 目录下，它只会拦截 `src/mock/index.js` 文件中拦截的 url。

**移除**只需要在 `src/main.js` 中移除 `import './mock'` 并且删除 `src/mock` 文件夹即可
