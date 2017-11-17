## 路由懒加载
当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue 的[异步组件](https://cn.vuejs.org/v2/guide/components.html#异步组件)和 Webpack 的[代码分割功能](https://doc.webpack-china.org/guides/code-splitting)，轻松实现路由组件的懒加载。如：
```js
const Foo = () => import('./Foo.vue')
```

### 区分开发与生产环境
当你的项目页面越来越多之后，在开发环境之中使用 `lazy-loading` 会变得不太合适，每次更改代码触发热更新都会变得非常的慢。所以建议只在生成环境之中使用路由懒加载功能。

生产环境：
```js
module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+

```
?> 这里注意一下改写法只支持 `vue-loader at least v13.0.0+`，理由 [vue-element-admin/issues/231](https://github.com/PanJiaChen/vue-element-admin/issues/231)

开发环境：
```js
module.exports = file => () => import('@/views/' + file + '.vue')
```
