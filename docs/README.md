# [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

[![vue](https://img.shields.io/badge/vue-2.5.9-brightgreen.svg ':no-zoom')](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-2.0.5-brightgreen.svg ':no-zoom')](https://github.com/ElemeFE/element)
[![Build Status](https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master)](https://travis-ci.org/PanJiaChen/vue-element-admin)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg ':no-zoom')](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg ':no-zoom')](https://github.com/PanJiaChen/vue-element-admin/releases)
[![GitHub stars](https://img.shields.io/github/stars/PanJiaChen/vue-element-admin.svg?style=social&label=Stars ':no-zoom')](https://github.com/PanJiaChen/vue-element-admin)

## Introduction

vue-element-admin is a admin interfaces integration solution, which is not suitable for secondary development as a base template.


Base template recommends using it: [vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template)。

This project is still in continuous iteration, gradually precipitating and summarizing more functions and corresponding implementation code,and summarizing the best practices in the admin product template / component / business scenario. This project also looks forward to your participation and. [Feedback](https://github.com/PanJiaChen/vue-element-admin/issues)。

## Features
```
- Login / Logout
- Permission authentication
- Multi-environment build
- Dynamic sidebar (supports multi-level routing)
- Dynamic breadcrumb
- I18n
- Customizable theme
- Tags-view(Tab page Support right-click operation)
- Rich text editor
- Markdown editor
- JSON editor
- Screenfull
- Drag and drop list
- Svg Sprite
- Dashboard
- Mock data
- Echarts
- Clipboard
- 401/404 error page
- Error log
- Export excel
- Export zip
- Front-end visualization excel
- Table example
- Dynamictable example
- Drag and drop table example
- Inline edit table example
- Form example
- Two-step login
- SplitPane
- Dropzone
- Sticky
- CountTo
- Markdown to html
```

## Preparation

You need to install [node](http://nodejs.org/) and [git](https://git-scm.com/) locally. The project is based on [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) and [element-ui](https://github.com/ElemeFE/element), It would be helpful if you have pre-existing knowledge on those.

At the same time supporting a series of tutorial articles, how to build a complete background project from scratch, suggest that you read these articles and then come to practice this project. But there's no English version yet.
 - [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
 - [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
 - [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
 - [手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
 - [手摸手，带你封装一个vue component](https://segmentfault.com/a/1190000009090836)
 - [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)

## Project Structure

This project has built the following templates, and have built a scaffold based on Vue, which should help you prototyping production-ready admin interfaces. It covers almost everything you need.

```bash
├── build                      // webpack config files
├── config                     // main project config
├── src                        // main source code
│   ├── api                    // api service
│   ├── assets                 // module assets like fonts,images (processed by webpack)
│   ├── components             // global components
│   ├── directive              // global directive
│   ├── filters                // global filter
│   ├── icons                  // svg icons
│   ├── lang                   // i18nlanguage
│   ├── mock                   // mock data
│   ├── router                 // router
│   ├── store                  // store
│   ├── styles                 // global css
│   ├── utils                  // global utils
│   ├── vendor                 // vendor
│   ├── views                  // views
│   ├── App.vue                // main app component
│   ├── main.js                // app entry file
│   └── permission.js          // permission authentication
├── static                     // pure static assets (directly copied)
│   └── Tinymce                // rich text editor
├── .babelrc                   // babel config
├── eslintrc.js                // eslint config
├── .gitignore                 // sensible defaults for gitignore
├── favicon.ico                // favicon ico
├── index.html                 // index.html template
└── package.json               // package.json
```

## Getting started

```bash
# clone the projice
git clone https://github.com/PanJiaChen/vue-element-admin.git

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527. If you see the following page then you have succeeded.

![](https://wpimg.wallstcn.com/1bc334a6-32a8-4f29-a037-ac3f5ce32588.png)

We have built-in models, standard components, mock data, hot module reloading, state management, i18n, global router, etc. You can continue exploring other documents for more details on those topics.

<br/>

**Suggestion：** You can use 'vue-element-admin' as a toolbox or as an integration solution repository, It is recommended to do secondary development on the basis of `vueAdmin-template`, if you need any additional feature, you can copy from `vue-element-admin`.

 - Toolbox: [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
 - Basis template: [vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template)  
 - Desktop: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

### Contribution
The repository of documentation is [vue-element-admin-site](https://github.com/PanJiaChen/vue-element-admin-site)

?> There may be some spelling or translation errors in the course of writing this document. It is welcome to point out by issue or pr.

### Donate
If you find this project useful, you can buy author a glass of juice  :heart:
[Donate](donate.md)

### Acknowledgment
This documentation is referenced [ANT DESIGN PRO](https://pro.ant.design/)

Documentation generation via [docsify](https://github.com/QingWei-Li/docsify)
