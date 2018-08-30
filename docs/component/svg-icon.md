---
sidebarDepth: 3
---

# Svg Icon

Global icon component: Svg Icon.

By default, the Svg Icon component is registered in [@/icons](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/icons/index.js#L6), and can be used anywhere in the project. All icons can be found in [@/icons/svg](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/icons/svg). You can add or remove the icon by yourself, and the icon will be imported automatically without manual operation.

## Usage

```html
<!-- use icon-class to setting name; use `class-name` to customizing class -->
<svg-icon icon-class="password"  class-name='custom-class' />
```

## Change color

By default, `svg-icon` reads its parent color `fill: currentColor;`

You can change the parent ` color ` or directly ` fill ` color.

:::tip
If you encounter the wrong color of the icon, you can refer to the [issue](https://github.com/PanJiaChen/vue-element-admin/issues/330) for modification
:::
