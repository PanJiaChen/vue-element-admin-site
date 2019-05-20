---
pageClass: getting-started
---

# Introducción

[![vue](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-2.7.0-brightgreen.svg)](https://github.com/ElemeFE/element)
[![Estado de Construcción](https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master)](https://travis-ci.org/PanJiaChen/vue-element-admin)
[![Licencia](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)
[![GitHub Lanzamiento](https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg)](https://github.com/PanJiaChen/vue-element-admin/releases)
[![Donar](https://img.shields.io/badge/%24-donate-ff69b4.svg)](https://panjiachen.gitee.io/vue-element-admin-site/zh/donate)
[![GitHub Estrellas](https://img.shields.io/github/stars/PanJiaChen/vue-element-admin.svg?style=social&label=Stars)](https://github.com/PanJiaChen/vue-element-admin)

[vue-element-admin](http://panjiachen.github.io/vue-element-admin) es una solución de front-end lista para producción para interfaces de administración. Basado en [vue](https://github.com/vuejs/vue) y utilizar el kit de herramientas de interfaz de usuario [element-ui](https://github.com/ElemeFE/element).

Es un administrador de vue mágico basado en la nueva pila de desarrollo de vue, la solución i18n incorporada, las plantillas típicas para aplicaciones empresariales, muchas características increíbles. Le ayuda a construir un gran complejo de aplicaciones de una sola página. Cualquiera que sean las necesidades, este proyecto te ayudará.

:::tip
Este proyecto integra una gran cantidad de características que no puede utilizar, causará una gran cantidad de redundancia de código. Si su proyecto no presta atención a este problema, también puede desarrollarlo directamente en función de él.
De lo contrario, puede utilizar [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template).

- Solución integrada: [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- Plantilla Básica: [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
- Desktop: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)
- Typescript: [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))
  :::

<br/>

## Caracteristicas

```
- Iniciar sesión / Cerrar sesión

- Autenticación de Permisos
  - Permiso de la página
  - Permiso directivo
  - Página de configuración de permisos
  - Inicio de sesión de dos pasos

- Construcción multi-ambiente
  - dev sit stage prod

- Características Globales
  - I18n
  - Múltiples temas dinámicos
  - Barra lateral dinámica (admite enrutamiento multinivel)
  - Breadcrumb dinámicos
  - Etiquetas-vista (Página de pestaña Soporte de operación del clic derecho)
  - Svg Sprite
  - Datos simulados
  - Pantalla completa
  - Barra lateral responsiva

- Editor
  - Editor de texto enriquecido
  - Editor de Markdown
  - Editor de JSON

- Excel
  - Exportar Excel
  - Subir Excel
  - Visualization de Excel
  - Exportar zip

- Tabla
  - Tabla dinamica
  - Arrastrar y soltar tabla
  - Tabla de edición en línea

- Página de error
  - 401
  - 404

- Componentes
  - Subir Avatar
  - Volver arriba
  - Arrastrar diálogo
  - Arrastrar Seleccionar
  - Drag Kanban
  - Arrastrar lista
  - panel dividido
  - Zona de descenso
  - Sticky
  - Contar hasta

- Ejemplo avanzado
- Registro de errores
- Tablero
- Guía de la página
- Gráficos E
- Portapapeles
- Markdown a html
```

<br/>

## Preparación

Necesitas instalar [node](http://nodejs.org/) y [git](https://git-scm.com/) locamente. El proyecto se basa en [ES2015+](http://es6.ruanyifeng.com/), [vue](https://cn.vuejs.org/index.html), [vuex](https://vuex.vuejs.org/zh-cn/), [vue-router](https://router.vuejs.org/zh-cn/), [vue-cli](https://github.com/vuejs/vue-cli) , [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element), todos los datos de solicitud se simulan utilizando [Mock.js](https://github.com/nuysoft/Mock).
La comprensión y el aprendizaje de este conocimiento de antemano le ayudará en gran medida el uso de este proyecto.

Al mismo tiempo que respalda una serie de artículos tutoriales, cómo construir un proyecto de fondo completo desde cero, le sugerimos que lea estos artículos y luego practique este proyecto. Pero todavía no hay una versión en español.

- [Las manos tocan tu mano, usa tu vue 撸 Backstage Series 1 (Basic)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [Las manos tocan tu mano, usa tu vue 撸 Backstage Series 2 (Permisos de inicio de sesión)](https://juejin.im/post/591aa14f570c35006961acac)
- [Las manos tocan tu mano, usa tu vue 撸 Backstage Series III (combate real)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [Toque de mano, llévese con vue 撸 Backstage Series 4 (vueAdmin, una plantilla de fondo minimalista)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [Toque con la mano, lo llevará a envolver un componente de vue](https://segmentfault.com/a/1190000009090836)
- [Manos y manos, traiga el icono de uso elegante](https://juejin.im/post/59bb864b5188257e7a427c09)
- [Las manos tocan tu mano, te usan con una postura razonable usando webpack4 (activado)](https://juejin.im/post/5b56909a518825195f499806)
- [Las manos tocan tu mano, te usan con una postura razonable usando webpack4 (abajo)](https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc)

::: tip
**Este proyecto no admite navegadores de bajo nivel (como IE, por ejemplo,). Si lo necesita, por favor agregue polyfills usted mismo.**
:::

## Estructura del Proyecto

Este proyecto ha incorporado las siguientes plantillas, y han construido un andamiaje basado en Vue, que debe ayudar a la creación de prototipos interfaces de administración listos para la producción. Cubre casi todo lo que necesita.

```bash
├── build                      # construir archivos de configuración
├── mock                       # datos simulados
├── plop-templates             # plantilla básica
├── public                     # activos estáticos puros (directamente copiados)
│   │── favicon.ico            # favicon
│   └── index.html             # plantilla index.html
├── src                        # código fuente principal
│   ├── api                    # servicio de api
│   ├── assets                 # Activos del módulo como fuentes, imágenes (procesadas por webpack).
│   ├── components             # componentes globales
│   ├── directive              # directiva global
│   ├── filters                # filtro global
│   ├── icons                  # iconos svg
│   ├── lang                   # idioma i18n
│   ├── layout                 # diseño global
│   ├── router                 # enrutador
│   ├── store                  # almacenar
│   ├── styles                 # css global
│   ├── utils                  # utiles globales
│   ├── vendor                 # vendor
│   ├── views                  # vistas
│   ├── App.vue                # componente principal de la aplicación
│   ├── main.js                # archivo de entrada de la aplicación
│   └── permission.js          # autenticación de permisos
├── tests                      # pruebas
├── .env.xxx                   # configuración de variables env
├── .eslintrc.js               # configuración eslint
├── .babelrc                   # configuración babel
├── .travis.yml                # configuración automatizada de CI
├── vue.config.js              # configuración vue-cli
├── postcss.config.js          # configuración postcss
└── package.json               # package.json
```

## Empezando

```bash
# clonar el proyecto
git clone https://github.com/PanJiaChen/vue-element-admin.git

# entrar en el directorio del proyecto
cd vue-element-admin

# instalar la dependencias
npm install

# develop
npm run dev
```

<br/>

Esto se abrirá automáticamente [http://localhost:9527](http://localhost:9527).

Si ve la siguiente página, entonces ha tenido éxito.

![](https://wpimg.wallstcn.com/1bc334a6-32a8-4f29-a037-ac3f5ce32588.png)

Tenemos modelos integrados, componentes estándar, datos simulados, recarga módulo de administración de estado, caliente, i18n, el router mundial, etc. Puede seguir explorando otros documentos para más detalles sobre estos temas.

<br/>

::: tip
**Sugerencia:** Puedes usar `vue-element-admin` como una caja de herramientas o como un repositorio de solución de integración, se recomienda hacer el desarrollo de secundaria sobre la base de `vue-admin-template`, Si necesita alguna característica adicional, puede copiar desde `vue-element-admin`.
:::

## Contribución

El repositorio de documentación es [vue-element-admin-site](https://github.com/PanJiaChen/vue-element-admin-site) basada en [vuepress](https://github.com/vuejs/vuepress) desarrollo.

Es posible que haya algunos errores de ortografía o traducción en el curso de la redacción de este documento. Es bienvenido señalar por tema o pr. Después de todo, el español no es mi lengua materna.

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) También continúa para repetir, resumir y sintetizar más características, y resumir las mejores prácticas de los productos plantillas / componentes / escenarios de negocio en el medio y de back office.. Este proyecto también espera su participación y [comentarios](https://github.com/PanJiaChen/vue-element-admin/issues).

## Donate

Si crees que este proyecto es útil, puedes comprar un vaso de jugo para el autor :heart:
[Donar](/donate/)

## Browsers Support

Los navegadores modernos e Internet Explorer 10+.

<!-- prettier-ignore -->
| [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| últimas 2 versiones | últimas 2 versiones | últimas 2 versiones
