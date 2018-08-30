---
sidebarDepth: 3
---

# Svg Icon

全局 Svg Icon 图标组件。

默认在 [@/icons](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/icons/index.js#L6) 中注册到全局中，可以在项目中任意地方使用。所以图标均可在 [@/icons/svg](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/icons/svg)。可自行添加或者删除图标，所以图标都会被自动导入，无需手动操作。

## Usage

```html
<!-- icon-class 为 icon 的名字; class-name 为 icon 自定义 class-->
<svg-icon icon-class="password"  class-name='custom-class' />
```

## Change color

`svg-icon` 默认会读取其父级的 color `fill: currentColor;`

你可以改变父级的`color`或者直接改变`fill`的颜色即可。

:::tip
如果你遇到图标颜色不对，可以参照本[issue](https://github.com/PanJiaChen/vue-element-admin/issues/330)进行修改
:::
