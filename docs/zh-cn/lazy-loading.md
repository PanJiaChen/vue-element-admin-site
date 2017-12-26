## 路由懒加载
当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue 的[异步组件](https://cn.vuejs.org/v2/guide/components.html#异步组件)和 Webpack 的[代码分割功能](https://doc.webpack-china.org/guides/code-splitting)，轻松实现路由组件的懒加载。如：
```js
const Foo = () => import('./Foo.vue')
```

### 区分开发与生产环境
当你的项目页面越来越多之后，在开发环境之中使用 `lazy-loading` 会变得不太合适，每次更改代码触发热更新都会变得非常的慢。所以建议只在生成环境之中使用路由懒加载功能。

开发环境：
```js
module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+

```
?> 这里注意一下该写法只支持 `vue-loader at least v13.0.0+`，理由 [vue-element-admin/issues/231](https://github.com/PanJiaChen/vue-element-admin/issues/231)

生产环境：
```js
module.exports = file => () => import('@/views/' + file + '.vue')
```

## 待改进
当然这样写会有一些副作用。由于
> Every module that could potentially be requested on an import() call is included. For example, import(./locale/${language}.json) will cause every .json file in the ./locale directory to be bundled into the new chunk. At run time, when the variable language has been computed, any file like english.json or german.json will be available for consumption.

`@/views/下的 .vue ` 文件都会被打包。不管你是否被依赖。所以这样就产生了一个副作用，就是会多打包一些可能永远都用不到js代码。当然这只会增加 dist 文件的大小，但不会对线上代码产生任何的副作用。[相关issue](https://github.com/PanJiaChen/vue-element-admin/issues/292)

?> 用户自己可以根据业务情况来衡量一下是否采用本方案，如果你的项目页面不超过几十个，本地开发热更新速度你还能接受的话，可以直接所有环境下都是用懒加载避免此副作用
