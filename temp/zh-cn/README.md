# [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

[![vue](https://img.shields.io/badge/vue-2.5.9-brightgreen.svg ':no-zoom')](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-2.0.5-brightgreen.svg ':no-zoom')](https://github.com/ElemeFE/element)
[![Build Status](https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master)](https://travis-ci.org/PanJiaChen/vue-element-admin)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg ':no-zoom')](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg ':no-zoom')](https://github.com/PanJiaChen/vue-element-admin/releases)
[![GitHub stars](https://img.shields.io/github/stars/PanJiaChen/vue-element-admin.svg?style=social&label=Stars ':no-zoom')](https://github.com/PanJiaChen/vue-element-admin)

## 介绍

vue-element-admin 是一个企业级中后台前端的集成方案，不适合当基础模板来进行二次开发。

模板建议使用: [vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template)。

本项目还在持续迭代中，逐步沉淀和总结出更多功能和相应的实现代码，总结中后台产品模板/组件/业务场景的最佳实践。本项目也十分期待你的参与和[反馈](https://github.com/PanJiaChen/vue-element-admin/issues)。

## 功能
```
- 登录/注销
- 权限验证
- 多环境发布
- 动态侧边栏（支持多级路由）
- 动态面包屑
- 国际化多语言
- 多种动态换肤
- 快捷导航(标签页)
- 富文本编辑器
- Markdown编辑器
- JSON编辑器
- Screenfull全屏
- 列表拖拽
- Svg Sprite 图标
- Dashboard
- 本地mock数据
- Echarts 图表
- Clipboard(剪贴复制)
- 401/404错误页面
- 错误日志
- 导出excel
- 导出zip
- 前端可视化excel
- Table example
- 动态table example
- 拖拽table example
- 内联编辑table example
- Form example
- 二步登录
- SplitPane
- Dropzone
- Sticky
- CountTo
- Markdown2html
```

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。我们的技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 和 [element-ui](https://github.com/ElemeFE/element)，提前了解和学习这些知识会对使用本项目有很大的帮助。

同时配套一个系列的教程文章，如何从零构建后一个完整的后台项目，建议大家先看完这些文章再来实践本项目
 - [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
 - [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
 - [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
 - [手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
 - [手摸手，带你封装一个vue component](https://segmentfault.com/a/1190000009090836)
 - [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filters                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 安装

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 安装依赖
npm install

# 本地开发 启动项目
npm run dev
```

?> 强烈建议不要用直接使用 cnpm 安装有各种诡异的 bug，可以通过重新指定 registry 来解决 npm 安装速度慢的问题

```bash
npm install --registry=https://registry.npm.taobao.org
```

启动完成后会自动打开浏览器访问 http://localhost:9527， 你看到下面的页面就代表成功了。

![](https://wpimg.wallstcn.com/1bc334a6-32a8-4f29-a037-ac3f5ce32588.png)

接下来你可以修改代码进行业务开发了，我们内建了典型业务模板、常用业务组件、模拟数据、HMR 实时预览、状态管理、国际化、全局路由等等各种实用的功能辅助开发，你可以继续阅读和探索左侧的其他文档。

<br/>

**建议：**  你可以把 `vue-element-admin`当做工具箱或者集成方案仓库，在 `vueAdmin-template` 的基础上开发，要什么就去 `vue-element-admin` 那里复制过来。

 - 集成方案: [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
 - 模板建议使用: [vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template)  
 - 桌面端: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

### Contribution
本文档代码项目地址 [vue-element-admin-site](https://github.com/PanJiaChen/vue-element-admin-site)

有任何修改和建议都可以该项目 pr 和 issue

### 捐赠
如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励 :heart:
[Donate](donate.md)

### 鸣谢
本文档参考了 [ANT DESIGN PRO](https://pro.ant.design/)

文档生成通过 [docsify](https://github.com/QingWei-Li/docsify)
