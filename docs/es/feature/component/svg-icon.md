---
sidebarDepth: 3
---

# Icono Svg

Componente de icono global: Icono Svg.

De forma predeterminada, el componente Svg Icon se registra en [@/icons](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/icons/index.js#L6), y puede ser Utilizado en cualquier parte del proyecto. Todos los iconos se pueden encontrar en [@/icons/svg](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/icons/svg). Puede agregar o eliminar el ícono por usted mismo, y el ícono se importará automáticamente sin operación manual.

## Uso

```html
  <!-- usa la clase de iconos para configurar el nombre; usa `class-name` para personalizar la clase -->
  <svg-icon icon-class="password"  class-name='custom-class' />
```

## Cambiar color

Por defecto, `svg-icon` lee su color primario `fill: currentColor;`

Puedes cambiar el `color` del padre o directamente el color del `fill` (o relleno).

## Import from url <Badge text="v4.2.0+"/>

Support import `svg` from external url. E.g:

`<svg-icon icon-class="https://xxxx.svg />`

## Tamaño

Si está descargando un ícono de [iconfont](https://www.iconfont.cn/), recuerde usar una herramienta como Sketch para especificar el tamaño del ícono. De lo contrario, el tamaño de los iconos en el proyecto puede no ser uniforme.

Los iconos utilizados en este proyecto son todas las especificaciones de tamaño 128\*128.

:::tip
Si encuentra el color incorrecto del icono, puede consultar el [issue](https://github.com/PanJiaChen/vue-element-admin/issues/330) para modificarlo
:::
