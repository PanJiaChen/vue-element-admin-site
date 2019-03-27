---
pageClass: getting-started
---

# Introduction

[![vue](https://img.shields.io/badge/vue-2.5.10-brightgreen.svg)](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-2.3.2-brightgreen.svg)](https://github.com/ElemeFE/element)
[![Build Status](https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master)](https://travis-ci.org/PanJiaChen/vue-element-admin)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg)](https://github.com/PanJiaChen/vue-element-admin/releases)
[![donate](https://img.shields.io/badge/%24-donate-ff69b4.svg)](https://panjiachen.github.io/vue-element-admin-site/donate)
[![GitHub stars](https://img.shields.io/github/stars/PanJiaChen/vue-element-admin.svg?style=social&label=Stars)](https://github.com/PanJiaChen/vue-element-admin)

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) is a front-end management background integration solution based on Vue 2.0 that uses the Element UI component library. It uses the latest front-end technology stack, provides a typical business model, and provides various components that can help you quickly build enterprise-level back-office product prototypes.

:::tip
The project is positioned as a background integration solution and is not suitable for secondary development as a basic template. Because this project integrates a lot of features that you may not use, it will cause a lot of code redundancy. If your project does not pay attention to this issue, you can also directly develop it based on it.

- Integrated Solution: [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- Basic Template: [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
- Desktop: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)
  :::

<br/>

## Features

```
- Login / Logout

- Permission Authentication
  - Page permission
  - Directive permission
  - Two-step login

- Multi-environment build
  - dev sit stage prod

- Global Features
  - I18n
  - Multiple dynamic themes
  - Dynamic sidebar (supports multi-level routing)
  - Dynamic breadcrumb
  - Tags-view(Tab page Support right-click operation)
  - Svg Sprite
  - Mock data
  - Screenfull
  - Responsive Sidebar

- Editor
  - Rich Text Editor
  - Markdown Editor
  - JSON Editor

- Excel
  - Export Excel
  - Export zip
  - Upload Excel
  - Visualization Excel

- Table
  - Dynamic Table
  - Drag And Drop Table
  - Tree Table
  - Inline Edit Table

- Error Page
  - 401
  - 404

- Components
  - Avatar Upload
  - Back To Top
  - Drag Dialog
  - Drag Kanban
  - Drag List
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- Advanced Example
- Error Log
- Dashboard
- Guide Page
- ECharts
- Clipboard
- Markdown to Html
```

<br/>

## Preparation

You need to install [node](http://nodejs.org/) and [git](https://git-scm.com/) locally. The project is based on [ES2015+](http://es6.ruanyifeng.com/), [vue](https://cn.vuejs.org/index.html), [vuex](https://vuex.vuejs.org/zh-cn/), [vue-router](https://router.vuejs.org/zh-cn/), [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element), all request data is simulated using [Mock.js](https://github.com/nuysoft/Mock). Understanding and learning this knowledge in advance will greatly help the use of this project.

At the same time supporting a series of tutorial articles, how to build a complete background project from zero, suggest that you read these articles and then come to practice this project. But there's no English version yet.

- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)
- [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)
- [手摸手，带你用合理的姿势使用 webpack4（上）](https://juejin.im/post/5b56909a518825195f499806)
- [手摸手，带你用合理的姿势使用 webpack4（下）](https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc)

::: tip
**This project does not support low-level browsers (such as ie). If you need to, please add polyfills yourself.**

**Note: This project uses element-ui@2.3.0+ version, so the minimum compatibility with vue@2.5.0+**
:::

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
├── .eslintrc.js               // eslint config
├── .gitignore                 // sensible defaults for gitignore
├── favicon.ico                // favicon ico
├── index.html                 // index.html template
└── package.json               // package.json
```

## Getting Started

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-element-admin.git

# install dependency
npm install

# develop
npm run dev
```

<br/>

This will automatically open http://localhost:9527.

If you see the following page then you have succeeded.

![](https://wpimg.wallstcn.com/1bc334a6-32a8-4f29-a037-ac3f5ce32588.png)

We have built-in models, standard components, mock data, hot module reloading, state management, i18n, global router, etc. You can continue exploring other documents for more details on those topics.

<br/>

::: tip
**Suggestion：** You can use `vue-element-admin` as a toolbox or as an integration solution repository, It is recommended to do secondary development on the basis of `vue-admin-template`, if you need any additional feature, you can copy from `vue-element-admin`.
:::

## Contribution

The repository of documentation is [vue-element-admin-site](https://github.com/PanJiaChen/vue-element-admin-site) based on [vuepress](https://github.com/vuejs/vuepress) development.

There may be some spelling or translation errors in the course of writing this document. It is welcome to point out by issue or pr. After all, English is not my mother tongue.

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) is also continuing to iterate, summarize and summarize more features, and summarize the best practices of product templates/components/business scenarios in the middle and back office. This project is also very much looking forward to your participation and [feedback](https://github.com/PanJiaChen/vue-element-admin/issues).

## Donate

If you think this project is useful, you can buy a glass of juice for the author :heart:
[Donate](/donate/)

## Browsers Support

Modern browsers and Internet Explorer 10+.

<!-- prettier-ignore -->
| [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
