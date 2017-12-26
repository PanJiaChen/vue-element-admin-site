# 新增页面

如果熟悉了 `router` 的配置就很简答了。

首先在 `@/router/index.js` 中增加你需要添加的路由。

<br/>

## 新增路由
**如新增一个导出 excel 页面**
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

<br/>

?> 仅仅这样不会有任何效果的，你还需要在其下面的 `children` 添加路由。

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
    { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }}
  ]
}
```
**侧边栏就会出现如图所示的 `menu-item` 了**

![](https://wpimg.wallstcn.com/2ab6921d-f9bb-4fbb-a151-0e6027e23a6e.png)

<br/>

?> 由于 `children` 下面只声明了一个路由所以不会有展开箭头，如果`children`下面的路由大于1就会有展开箭头如：

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
如果你的路由是多级目录，如本项目 `@/views/example` 那样 有三级嵌套的路由情况下，不要忘记还在手动在二级目录的根文件下添加一个 `router-view` `@/views/example/table/index.vue`

![](https://wpimg.wallstcn.com/9459de62-64d0-4819-9730-daf3f9889018.png)

## 新增view
新增完路由之后不要忘记在 `@/views` 文件下 创建对应的文件夹，一般性一个路由对应一个文件，该模块下的功能组件或者方法就建议在本文件夹下创建一个`utils`或'components'，如：

![](https://wpimg.wallstcn.com/8ca55a30-c22c-4143-aa8d-2a0d3e04fc33.png)

<br/>
<br/>

## 新增api
最后在 `@/api` 下面创建本模块对应的 api 服务。
