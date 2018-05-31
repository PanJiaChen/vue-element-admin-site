# 路由和菜单

路由和菜单是组织起一个后台应用的关键骨架。

本项目侧边栏和路由是绑定在一起的，所以你只有在 `@/router/index.js` 下面配置对应的路由，侧边栏就能动态的生成了。大大减轻了手动编辑侧边栏的工作量。当然这样就需要在配置路由的时候遵循很多的约定。

## 配置项
首先我们了解一些本项目配置路由时提供了哪些配置项。

```js
//当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
hidden: true

//当设置 noredirect 的时候该路由不会在面包屑导航中出现
redirect: noredirect

//当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
//当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
alwaysShow: true

name:'router-name'            //设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
meta : {
  roles: ['admin','editor']   //设置该路由进入的权限，支持多个权限叠加
  title: 'title'              //设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name'            //设置该路由的图标
  noCache: true               //如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
}
```

<br/>

**示例：**
```js
{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  hidden: true,
  alwaysShow: true,
  meta: { roles: ['admin','edior'] }, // you can set roles in root nav
  children: [{
    path: 'index',
    component: _import('permission/index'),
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      role: ['admin','editor'], // or you can only set roles in sub nav
      noCache: true
    }
  }]
}
```

## 路由

这里的路由分为两种，`constantRouterMap` 和 `asyncRouterMap`。

 **constantRouterMap** 代表那些不需要动态判断权限的路由，如登录页，404，等通用页面。

 **asyncRouterMap** 代表那些需求动态判断权限并通过 `addRouters` 动态添加的页面。具体的会在 [权限判断](https://panjiachen.github.io/vue-element-admin-site/#/permission) 页面介绍。

> 这里所有的组件使用自定义方法 `_import ` 引入，具体介绍见[路由懒加载](https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading)

> 如果你想了解更多关于 browserHistory 和 hashHistory，请参看 [构建和发布](deploy)。

其它的配置和 [vue-router](https://router.vuejs.org/zh-cn/) 官方并没有区别，自行查看文档。

?> **注意事项：**如果这里有一个需要非常注意的地方就是404页面一定要最后加载，如果放在 constantRouterMap 一同声明了404，后面的所以页面都会被拦截到404，详细的问题见 [addRoutes when you've got a wildcard route for 404s does not work](https://github.com/vuejs/vue-router/issues/1176)

## 侧边栏

本项目侧边栏主要基于 `element-ui` 的 `el-menu` 改造。

前面也介绍了，侧边栏是通过读取路由并结合权限判断而动态生成的，而且还需要支持路由无限嵌套，所以这里还使用到了递归组件。

> 代码地址: [@/views/layout/components/Sidebar](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/layout/components/Sidebar)

这里同时也改造了 `element-ui` 默认侧边栏不少的样式，所有的css都可以在 [@/styles/sidebar.scss](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/styles/sidebar.scss) 中找到，可以根据自己的需求进行修改。

?> 这里需要注意一下，一般侧边栏有两种形式，即有 `submenu` 和 直接 `el-menu-item`。 一个嵌套子菜单，一个则是直接一个链接。如下图：

![](https://wpimg.wallstcn.com/e94739d6-d701-45c8-8c6e-0f4bb10c3b46.png)

?> 在 `Sidebar` 中已经做了判断，当你一个路由下面的 `children` 声明的路由大于1个时，自动会变成嵌套的模式。如果子路由正好等于一个就会默认将子路由作为根路由显示在侧边栏中，若不想这样，可以通过设置在根路由中设置`alwaysShow: true`来取消这一特性。如：
```js
// no submenu, because children.length===1
{
  path: '/icon',
  component: Layout,
  children: [{
    path: 'index',
    component: _import('svg-icons/index'),
    name: 'icons',
    meta: { title: 'icons', icon: 'icon' }
  }]
},

// has submenu, because children.length>=1
{
  path: '/components',
  component: Layout,
  name: 'component-demo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
    { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
  ]
}
```

### 点击侧边栏 刷新当前路由
在用 spa(单页面应用) 这种开发模式的之前，用户每次点击侧边栏都会重新请求这个页面，用户渐渐养成了点击侧边栏当前路由来刷新 view 的习惯。但现在 spa 就不一样了，用户点击当前高亮的路由并不会刷新 view，因为 vue-router 会拦截你的路由，它判断你的url并没有任何变化，所以它不会触发任何钩子或者是view的变化。[issue](https://github.com/vuejs/vue-router/issues/296) 地址，社区也对该问题展开了激烈讨论。

![](https://wpimg.wallstcn.com/5d0b0391-ea6a-45f2-943e-aff5dbe74d12.png)

尤大本来也说要增加一个方法来强刷 view，但后来他又改变了心意/(ㄒoㄒ)/~~。但需求就摆在这里，我们该怎么办呢？他说了不改变current URL 就不会触发任何东西，那我可不可以强行触发你的hook呢？上有政策， 下有对策我们变着花来hack。方法也很简单，通过不断改变 url的 query 来触发view的变化。我们监听侧边栏每个 link 的 click 事件，每次点击都给 router push 一个不一样的query 来确保会重新刷新 view。

```js
clickLink(path) {
  this.$router.push({
    path,
    query: {
      t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
    }
  })
}
```

ps:不要忘了在 `router-view` 加上一个特定唯一的 `key`，如 `<router-view :key="$route.path"></router-view>`，
但这也有一个弊端就是 url 后面有一个很难看的 `query` 后缀如 `xxx.com/article/list?t=1496832345025`


## 面包屑
本项目中也封装了一个面包屑导航，它也是通过 `watch $route` 变化动态生成的。它和 menu 也一样，也可以通过之前那些配置项控制一些路由在面包屑中的展现。大家也可以结合自己的业务需求增改这些自定义属性。

![](https://wpimg.wallstcn.com/4c60b3fc-febd-4e22-9150-724dcbd25a8e.gif)

> 组件地址: [@/components/Breadcrumb](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/Breadcrumb/index.vue)


## 侧边栏滚动问题
之前版本的滚动都是用css来做处理的
```css
overflow-y:scroll;

::-webkit-scrollbar {display:none}

```

首先这样写会有兼容性问题，在火狐或者其它低版本游览器中都会比较不美观。其次在侧边栏收起的情况下，受限于 `element-ui`的 `menu` 组件的实现方式，不能使用该方式来处理。

所以现版本中使用了 js 来处理侧边栏滚动问题。封装了 滚动组件 `ScrollPane`。

> 代码地址: [@/components/ScrollPane](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/ScrollPane/index.vue)


