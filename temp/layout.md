# Layout
To learn about a management system, we must first understand its basic layout.

Layout is the outermost structure for a project, ususaly consists of navigation, sidebar, breadcrumb and content.

![](https://wpimg.wallstcn.com/7066d74f-12c5-47d6-b6ad-f22b43fec917.png)


> Corresponding code:  [@/views/layout](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/layout :blank)

?> `@` is webpack [alias](https://webpack.js.org/configuration/resolve/#resolve-alias) If you don't understand, please study yourself.

Most pages in `vue-element-admin` are based on this `layout`, except for pages such as` login`, `404`,` 401` and others that are not used by the `layout`.

It's also easy if you want to have many different `layout` in a project, as long as you select a different` layout` component on the first level route.

```js
//no layout
{
  path: '/401',
  component: _import('errorPage/401')
}

//has layout
{
  path: '/documentation',
  //you can choose different layout components
  component: Layout,

  //the route that starts here will be shown in app-main as shown above
  children: [{
    path: 'index',
    component: _import('documentation/index'),
    name: 'documentation'
  }]
}
```

It's used vue-router [Nested Routes](https://router.vuejs.org/en/essentials/nested-routes.html), So you add or modify the page will only affect ​​the `app-main`, the other as the sidebar or navigation bar will not change.

Of course, you can also use multiple `layout` in a project, just refer to it in the route parent you want to work with.


## app-main

> Corresponding code: [@/views/layout/components/AppMain](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/layout/components/AppMain.vue)

Here's wrap ` app-main` in a `<keep-alive>` element, mainly for caching `<router-view>`, which works with the `tabs-view` tab navigation on the page, if not needed [remove it](tags-view)。

### router-view
different router the same component vue. In real business scenarios, this is a lot. Such as

![](https://wpimg.wallstcn.com/ac5047c9-cb75-4415-89e3-9386c42f3ef9.jpeg)

If you have two pages, such as creating and editing pages using the same component. By default, the created or mounted hook of vue is not triggered when the two pages are switched. Officials say you can do this by watching the changes in $ route, but in fact it's really annoying.Later It turns out that you can simply add a unique key in the `router-view`, to ensure that the routing switch will re-render the trigger hook. This is much simpler.

```js
<router-view :key="key"></router-view>

computed: {
  key() {
    // or :key="$route.path" just need a unique key
    return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
  }
 }
```

<br/>

?> **Or** You can declare two different router view like `editForm` and `createForm` in this project but import the same component.

```html
//create.vue
<template>
  <article-detail :is-edit='false'></article-detail> //create
</template>
<script>
  import ArticleDetail from './components/ArticleDetail'
</script>

//edit.vue
<template>
   <article-detail :is-edit='true'></article-detail> //edit
</template>
<script>
  import ArticleDetail from './components/ArticleDetail'
</script>
```

> Corresponding code: [@/views/form](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/form)

## mobile
'element-ui' the official positioning is a desktop backstage framework, so this project will not be suitable for mobile, if you need to modify it by youself.
