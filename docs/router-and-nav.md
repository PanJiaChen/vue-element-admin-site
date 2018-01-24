# Router and Nav

Router and Nav are the key skeleton for organizing a management system.

This project router and nav are bound together, sso you only have to configure the route under `@/router/index.js` and the sidebar nav can be generated dynamically.This greatly reduces the workload of manually editing the sidebar nav. Of course, so you need to follow many conventions in configuring the route.

## Config
First let us know what configuration items are provided config route.

```js
// if set to true, lt will not appear in sidebar nav. e.g. login or 401 page (Default: false)
hidden: true

//if set true, will always show the root menu, whatever its child routes length
//if not set alwaysShow, only more than one route under the children will become nested mode
//otherwise not show the root menu, set the child route to root menu
alwaysShow: true

// if set to noredirect, lt will not appear in breadcrumb
redirect: noredirect

// set router name. It must be setted，in order to avoid problems with <keep-alive>.
name:'router-name'

meta : {
  // required roles to navigate to this route. Support multiple permissions overlay.
  // Note that one match is enough to pass the check.
  roles: ['admin','editor'] // if not set means it doesn't need any permission.

  // the title of the route to show in various components (e.g. sidebar, breadcrumbs).
  title: 'title'

  // icon class for the route link.
  icon: 'svg-name'

  // when set true, the route will not be cached by <keep-alive>. Default false
  noCache: true
}
```
?> **Note:** Every route record (the term use because of VueRouter documentation) MUST have the name property in order to avoid problems with <keep-alive>.

<br/>

**Example：**
```js
{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  hidden: true,
  alwaysShow: true,
  meta: { roles: ['admin','ediotr'] }, // you can set roles in root nav
  children: [{
    path: 'index',
    component: _import('permission/index'),
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin','ediotr'], // or you can only set roles in sub nav
      noCache: true
    }
  }]
}
```

## Router

There are two types of routes here , `constantRouterMap` and `asyncRouterMap`.

 **constantRouterMap: ** represents routes that do not require dynamic access, such as login page, 404, and so on.

 **asyncRouterMap: ** represents pages that require dynamic judgment permissions and are dynamically added through `addRouters`. The details will be introduced on the [permission judgment page](https://panjiachen.github.io/vue-element-admin-site/#/permission).

> 这里所有的组件使用自定义方法 `_import ` 引入，具体介绍见[路由懒加载](https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading) #for perf

> If you want to know more about browserHistory and hashHistory, please refer to [Build & Deploy](deploy).

The other configurations are no different from the [vue-router](https://router.vuejs.org/en/) official, so check the documentation for yourself.

?> **Note: ** There is one thing to be careful about is that the 404 page must be the last to load, if it is declared in constantRouterMap. Later declared pages will be blocked to 404, see the details of the problem:  [addRoutes when you've got a wildcard route for 404s does not work](https://github.com/vuejs/vue-router/issues/1176)

## Sidebar

The project sidebar is mainly based on the `el-menu` element-ui`.

Also introduced in the front, the sidebar is generated dynamically by reading the route and combined with the authority to judge, but also need to support the infinite nesting of routes, so here is also used to the recursive components.

> Corresponding code: [@/views/layout/components/Sidebar](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/layout/components/Sidebar)

This also modify many default sidebar styles of `element-ui`. All css can be found in [@/styles/sidebar.scss](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/styles/sidebar.scss) and can be modified to suit your needs.

?> Here need to pay attention, The general sidebar has two forms, `submenu` and` el-menu-item`.  One is a nested submenu, the other is a direct link. As shown below:

![](https://wpimg.wallstcn.com/e94739d6-d701-45c8-8c6e-0f4bb10c3b46.png)

?> It has been determined in `Sidebar` that when you declare more than `one` route under the `children` , it automatically becomes nested mode. Such as:

```js
// no submenu, because children.length===1
{
  path: '/icon',
  component: Layout,
  children: [{
    path: 'index',
    component: _import('svg-icons/index'),
    name: 'icons',
    meta: { title: 'icons', icon: 'icon'}
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

### Click the sidebar to refresh the current route
Before using the development model of spa(single page application), each time the user clicks the sidebar will request this page again, the user gradually developed the habit of clicking the current route in the sidebar to refresh the view. But now the spa is not the same, the user clicks the currently highlighted route and does not refresh the view, because the vue-router will intercept your routing, it determines your url does not change, so it will not trigger any hook or view changes.[Related issue](https://github.com/vuejs/vue-router/issues/296), the community has also heated discussions on the issue.

![](https://wpimg.wallstcn.com/5d0b0391-ea6a-45f2-943e-aff5dbe74d12.png)

`yyx990803`also said that he wanted to add a way to brighten the view, but later he changed his mind again/(ㄒoㄒ)/~~ But demand is here, what should we do? He said it would not trigger anything without changing the current URL, so can I force the trigger? The hack is simple. By changing the url query to trigger the view changes。We listen to each link's click event on the sidebar, each click will push a different query for the router to ensure that the view is refreshed.

```js
clickLink(path) {
  this.$router.push({
    path,
    query: {
      //Ensure that each click, query is not the same, to ensure that refresh the view
      t: +new Date()
    }
  })
}
```
?> ps: Don't forget to add a unique 'key' to `router-view`, such as `<router-view :key="$route.path"></router-view>`.

But there's also a drawback the ugly 'query' suffix behind url, such as `xxx.com/article/list?t=1496832345025`


## Breadcrumb

This project also packages a breadcrumb navigation, which is also dynamically generated by the watch $ route change. It is the same with the menu, you can also config it in the routing. You can also add some custom attributes to your business needs in route.meta attr.

![](https://wpimg.wallstcn.com/4c60b3fc-febd-4e22-9150-724dcbd25a8e.gif)

> Corresponding code: [@/components/Breadcrumb](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/Breadcrumb/index.vue)


## Sidebar scroll problem
Previous versions of scroll were handled with css
```css
overflow-y:scroll;

::-webkit-scrollbar {display:none}

```
But hack by css has some problems, in Firefox or other lower versions of the browser will be less beautiful.
Second, in the case of sidebar collapses, limited to `menu` of` element-ui`, can not be handled in this way.

So now use js to deal with sidebar scrolling problem. Write a scroll component `ScrollPane`.
> Corresponding code: [@/components/ScrollPane](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/ScrollPane/index.vue)
