> (Emitted value instead of an instance of Error) the "scope" attribute for scoped slots have been deprecated and replaced by "slot-scope" since 2.5. The new "slot-scope" attribute can also be used on plain elements in addition to <template> to denote scoped slots.

element slot


![](https://wpimg.wallstcn.com/c093f01d-f77b-416a-ac4f-330f9c597f06.png

## 侧边栏
优化了侧边栏动画，并且使用js模拟侧边栏滚动。

## 路由
规范了路由配置，统一使用将配置放入meta之中。

## keep-alive
优化了tags-view 标签栏导航，现在能手动配置需要缓冲的页面。

## Dashboard
重构了dashboard

## 请求
之前将 axios 请求封装了一个实例，文件夹取名为 fetch。新版本为了规避与原生 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 名字上的歧义，所以将原本所有叫 `fetch` 的都更改为了 `request`，使用方法和原先没有任何的区别。

代码地址：`@/utils/request.js`

## Layout
调整了 layout 的目录结构

## Style
新增了 variables.scss 和 transition.scss

## Svg Icon
优化了svg icon 并将组件名修改为 `svg-icon`

## 国际化
新增了国际化 vue-i18n

## 使用文档
新增了 [使用文档](https://panjiachen.github.io/vue-element-admin-site/#/)

##不兼容更新
该项目目前使用element-ui@2.0.5版本，所以最低兼容 Vue 2.5.0
