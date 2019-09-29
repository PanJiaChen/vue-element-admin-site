---
sidebarDepth: 3
---

# Portapapeles

Aquí está el copiar y pegar basado en [portapapeles](https://github.com/zenorocha/clipboard.js)

Este proyecto proporciona dos formas de uso.

## Usar directamente

```html
<el-button @click='handleCopy(inputData,$event)'>copiar</el-button>
```

```js
import clip from '@/utils/clipboard.js' // usar el portapapeles directamente

methods: {
  handleCopy(text, event) {
    clip(text, event)
  }
}
```

En primer lugar, importe `clipboard.js` y configure la función `click`.

`clip()` El primer parámetro es el contenido de copiar, el segundo parámetro es el evento de evento. Ambos parámetros son necesarios.

### New way of use <Badge text="v4.3.0+"/>

In order to support the async setting of text, the original method is reconstructed. In the new version, `clip` will return a promise, and the params will be changed to an object, and it is no longer necessary to manually pass the $event.

```html
<el-button @click='handleCopy(inputData,$event)'>copy</el-button>
```

```js
import clip from '@/utils/clipboard' // use clipboard directly

methods: {
  handleCopy(text) {
    // return a promise
    clip({ text, container, successText, errorText }).then(()=>{
      console.log('success)
    })
  }
}
```

<br/>
<br/>

## v-directive

Este proyecto también encapsula un `v-clipboard`.

```html
 <el-button
   v-clipboard:copy='inputData'
   v-clipboard:success='clipboardSuccess'>
   copiar
</el-button>
```

```js
import clipboard from '@/directive/clipboard/index.js' // usar el portapapeles por v-directive

directives: {
  clipboard
},
methods: {
  clipboardSuccess() {
    this.$message({
      message: 'Copia exitosa',
      type: 'success',
      duration: 1500
    })
  }
}
```

`v-clipboard:copy`: La copia del contenido.

`v-clipboard:success`: Función de devolución de llamada de éxito.
