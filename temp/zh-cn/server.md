# 和服务端进行交互

## 前端请求流程

在 vue-element-admin 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1. UI 组件交互操作；
3. 调用统一管理的 api service 请求函数；
4. 使用封装的 request.js 发送请求；
5. 获取服务端返回；
7. 更新 data；

从上面的流程可以看出，为了方便管理维护，统一的请求处理都放在 `src/api` 文件夹中，并且一般按照 model 纬度进行拆分文件，如：

```
api/
  login.js
  article.js
  remoteSearch.js
  ...
```

其中，`src/utils/request.js` 是基于 [axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。具体可以参看 [request.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/request.js)。
它封装了全局 `request拦截器`、`respone拦截器`、`统一的错误处理`、`统一做了超时，baseURL设置等`

### 一个请求文章列表页的例子：

```js
// api/article.js
import request from '../utils/request';

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// views/articleList
import { fetchList } from '@/api/article'
export default {
  data() {
    list: null,
    listLoading: true
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
```


## 从 mock 直接切换到服务端请求
见[ Mock 和联调](mock-api.md)
