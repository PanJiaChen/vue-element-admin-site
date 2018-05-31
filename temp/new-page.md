# New Page

If you are familiar with the `vue-router` then it will be very simple.

First add the routing to the `@/router/index.js`.

**Such as: add an excel page**
```js
{
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'excel',
  meta: {
    title: 'excel',
    icon: 'excel'
  }
}
```

?> It just creates a blank route based on 'layout', and you also need to add a route to the 'children' below it.

```js
{
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'excel',
  meta: {
    title: 'excel',
    icon: 'excel'
  },
  children: [
    {
      path: 'export-excel',
      component: _import('excel/exportExcel'),
      name: 'exportExcel',
      meta: { title: 'exportExcel' }
    }
  ]
}
```
**This sidebar will appear the menu-item**

![](https://wpimg.wallstcn.com/2ab6921d-f9bb-4fbb-a151-0e6027e23a6e.png)

<br/>

?> Since there is only one route declared under `children`, there will be no expansion arrow, and if the length of  `children` is more than 1, there will be an expansion arrow such as:

```js
{
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'excel',
  meta: {
    title: 'excel',
    icon: 'excel'
  },
  children: [
    { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
    { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
    { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
  ]
}
```
![](https://wpimg.wallstcn.com/89d6a0b8-5cf7-4a19-9afd-7267ec454066.png)

**The sidebar will appear the `submenu`.**

<br/>

## Nested Routes
If you have a nested Route, such as [@/views/example](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/example),
Don't forget to manually add an `< router-view >` to the root file of the secondary directory.

 Such as: [@/views/example/table/index.vue](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/example/table/index.vue).

 **Note: ** As many `<router-view>` as the level of routes nested.

![](https://wpimg.wallstcn.com/9459de62-64d0-4819-9730-daf3f9889018.png)

<br/>

## Create View
After adding the route, create a view under the `@/views`. As usual, a router correspond
a view.

Suggestion if a component or utils function only used in this view, just create a component folder under this view, lt is more convenient for each module to maintain its own `utils` or `components`.

![](https://wpimg.wallstcn.com/8ca55a30-c22c-4143-aa8d-2a0d3e04fc33.png)

<br/>

## Create Api

Finally, under the [@/api](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/api) folder, create the corresponding api service for this module.
