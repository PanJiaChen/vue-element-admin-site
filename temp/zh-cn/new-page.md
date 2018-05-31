# 新增页面

如果熟悉 `vue-router` 的配置就很简单了。

首先在 `@/router/index.js` 中增加你需要添加的路由。

**如：新增一个excel 页面**
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

?> 仅仅这样不会有任何效果的，它只是创建了一个基于`layout`的一级路由，你还需要在它下面的 `children` 中添加路由。

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
**这样侧边栏就会出现如图所示的 `menu-item` 了**

![](https://wpimg.wallstcn.com/2ab6921d-f9bb-4fbb-a151-0e6027e23a6e.png)

<br/>

?> 由于 `children` 下面只声明了一个路由所以不会有展开箭头，如果`children`下面的路由个数大于1就会有展开箭头如：

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

**侧边栏就会出现如图所示的 `submenu` 了**

<br/>
<br/>

## 多级目录
如果你的路由是多级目录，如本项目 [@/views/example](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/example) 那样， 有三级路由嵌套的情况下，不要忘记还要手动在二级目录的根文件下添加一个 `<router-view>`。

 如：[@/views/example/table/index.vue](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/example/table/index.vue)，有多少级路由嵌套就需要多少个`<router-view>`。

![](https://wpimg.wallstcn.com/9459de62-64d0-4819-9730-daf3f9889018.png)

<br/>

## 新增view
新增完路由之后不要忘记在 `@/views` 文件下 创建对应的文件夹，一般性一个路由对应一个文件，该模块下的功能组件或者方法就建议在本文件夹下创建一个`utils`或`components`文件夹，各个功能模块维护自己的`utils`或`components`组件。如：

![](https://wpimg.wallstcn.com/8ca55a30-c22c-4143-aa8d-2a0d3e04fc33.png)

<br/>
<br/>

## 新增api
最后在 [@/api](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/api) 文件夹下创建本模块对应的 api 服务。
