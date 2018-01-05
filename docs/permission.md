# 权限验证

在 [手摸手，带你用vue撸后台 系列二(登录权限篇)](https://segmentfault.com/a/1190000009506097) 这章中其实已经详细介绍过了。

该项目中权限的实现方式是：通过获取当前用户的权限去比对路由表，生成当前用户具的权限可访问的路由表，通过router.addRoutes动态挂载到router上。
但其实很多公司的业务逻辑可能不是这样的，举一个例子来说，很多公司的需求是每个页面的权限是动态配置的，不像本项目中是写死预设的。但其实原理是相同的。如这个例子，你可以在后台通过一个tree控件或者其它展现形式给每一个页面动态配置权限，之后将这份路由表存储到后端。当用户登录后根据roles，后端返回一个相应的路由表或者前端去请求之前存储的路由表动态生成可访问页面，之后就是router.addRoutes动态挂载到router上，你会发现原来是相同的，万变不离其宗。

ps:不排除之后本项目会增加权限控制面板支持真正的动态配置权限。

## 逻辑修改
现在路由层面权限的控制代码都在 `@/permission.js` 中，如果想修改逻辑，直接在适当的判断逻辑中 `next()` 释放钩子即可。


**Example：**
```js
{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  meta: { roles: ['admin','ediotr'] }, // you can set roles in root nav
  children: [{
    path: 'index',
    component: _import('permission/index'),
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin','ediotr'], // or you can only set roles in sub nav
    }
  }]
}
```
