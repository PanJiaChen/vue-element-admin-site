# Cors

The most question I am asked is still about cross-domain issues. In fact, the cross-domain issue is really not a very difficult one to solve. Here I will briefly summarize several cross-domain solutions I recommend.

The most recommended way is also commonly used by our company is `cors`, full name is `Cross Origin Resource Sharing`.This solution does not make any difference to the front-end write request as usual.The workload is basically on the back-end. For each request, the browser must first send a pre-request as OPTIONS, to know the server-side HTTP method supported for cross-source requests. After confirming that the server allows the cross-source request, then send the real request with the actual HTTP request method.

The reason for the recommendation is: once the first match, and then no matter how many interfaces and project reuse will be OK, once and for all to solve the cross-domain problem,and regardless of the development environment or production environment can be easily used.

But there are always trouble back-end development do not want to do this.That pure front-end is also has solutions.

In dev environment, you can use webpack `proxy`, it is also very easy to use。 It's recommended that you look at the [document](https://doc.webpack-china.org/configuration/dev-server/#devserver-proxy) and we're not going to discuss it here. Some of the author's personal projects use this method

But this method can not used in the production environment. In production environment, you need to use nginx reverse proxy. Whether `proxy` or `nginx`, the principle is the same. Solve the cross-domain issues by building a transit server to forward requests.

| development | production   |
| :--------:   | -----  |
|    cors    |  cors  |
|    proxy    |  nginx  |

Here I only recommend these two ways cross-domain, the other cross-domain ways are many, but the only real mainstream is `cors` and `nginx`.
