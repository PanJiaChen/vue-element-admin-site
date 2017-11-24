> (Emitted value instead of an instance of Error) the "scope" attribute for scoped slots have been deprecated and replaced by "slot-scope" since 2.5. The new "slot-scope" attribute can also be used on plain elements in addition to <template> to denote scoped slots.

element slot


![](https://wpimg.wallstcn.com/c093f01d-f77b-416a-ac4f-330f9c597f06.png


## 请求

之前将 axios 请求封装了一个实例，文件夹取名为 fetch。新版本为了规避与原生 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 名字上的歧义，所以将原本所有叫 `fetch` 的都更改为了 `request`，使用方法和原先没有任何的区别。

代码地址：`@/utils/request.js`


## layout
调整了 layout 的目录结构

## style
新增了 variables.scss 和 transition.scss

## svg icon
优化了svg icon 并讲组件名修改为 `svg-icon`
