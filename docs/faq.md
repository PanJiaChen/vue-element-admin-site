# Common problem

?> Please refer to the following FAQ before asking questions.

## What is the difference between vue-element-admin and vueAdmin-template?

vue-element-admin: is a back-end integration program, it contains a lot of features and components, is not suitable as a basic template for secondary development.

vueAdmin-template: is a basic admin scaffolding, suitable for secondary development.

<br/>

## First of all there is any error, the easiest way is to copy the error message to the browser search!!!
[google](http://lmgtfy.com/?q=%E6%90%9C%E4%B8%80%E6%90%9C)

[baidu](http://www.baidu-x.com/?q=%E6%90%9C%E4%B8%80%E6%90%9C)

<br/>

## Vendor too big problem?
It is recommended to use gzip, after using the volume will be only the original 1/3 or so. You can also use lazy loading or Code Splitting. If the app.js is to big, Check if Uglify is configured incorrectly or sourceMap is not correct.

<br/>

## How do I have a # in my url? How to get rid?
see vue-router `browserHistory` 和 `hashHistory`.

<br/>

## npm install 总是失败？
由于中国墙的的原因，安装一些依赖时很容易出现超时问题，国内用户推荐使用淘宝源的安装方式
```bash
npm install --registry=https://registry.npm.taobao.org
```

<br/>

## node-sass 安装失败？
[issues/25](https://github.com/PanJiaChen/vue-element-admin/issues/25)

[issues/24](https://github.com/PanJiaChen/vue-element-admin/issues/24)

<br/>

## mock 问题
请参考文档 [Mock 和联调](mock-api) 主要由于 `browserHistory` 和 `hashHistory` 。

<br/>

## 跨域问题 如：为什么发了一个 options  请求? Access-Control-Allow-Origin 报错等?
请参考文档 [跨域问题](cors.md)

<br/>

## 图片 background url() 引用问题？
https://github.com/vuejs/vue-loader/issues/481

https://github.com/vuejs/vue-cli/issues/112

<br/>

##  @ 或者如为什么他的项目可以`src/xxx/` 这样写，而我的却报路径错误？
这种情况很有可能人家在配置了 webpack 的 alias

`@` 是 webpack 的 [alias](https://webpack.js.org/configuration/resolve/#resolve-alias) 不懂得请自行研究。

<br/>

## can't not find 'xxModule' - 找不到某些依赖或者模块
这种情况一般报错信息可以看到是哪个包抛出的信息.
一般卸载这个模块,安装重新安装下即可.

<br/>

## 我用了 axios , 为什么 IE 浏览器不识别(IE9+)
 IE 不支持 promise，所有需要单独引入 polyfill

 ```js
 npm install es6-promise

 // 在 main.js 引入即可
require("es6-promise").polyfill();
 ```

<br/>

 ## 其它任何关于 vue 的问题 ？
 请你首先仔细阅读 vue [官方文档](https://cn.vuejs.org/index.html),但部分问题其实看报错就能知道了！

<br/>

## 辅助文章
[Vue 脱坑记 - 查漏补缺(汇总下群里高频询问的xxx及给出不靠谱的解决方案)](https://juejin.im/post/59fa9257f265da43062a1b0e)
