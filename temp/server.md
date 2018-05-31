# Work with Server

## Front-end request flow

In vue-element-admin, a complete front-end UI interacts to the server-side processing flow  as follows:

1. UI component interaction;
3. Call unified management API service request function;
4. Send requests using encapsulated request.js;
5. Get server return;
7. Update data;

As you can see from the above flow, in order to facilitate management and maintenance, unified request processing is placed in the 'src/api' folder and the files are generally split according to the model latitude,such as:

```
api/
  login.js
  article.js
  remoteSearch.js
  ...
```

### request.js

`src/utils/request.js` is based on the [axios](https://github.com/axios/axios), to facilitate the uniform handling of POST, GET and other request parameters, request headers, and error messages。Specific can see [request.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/request.js).

It encapsulates the global `request interceptor`, `respone interceptor`,` unified error handling`, `unified timeout, baseURL settings, etc.`

### An example of a request article list:

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
