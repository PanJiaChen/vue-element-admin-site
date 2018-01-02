# Rich text editor

Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose [Tinymce](https://github.com/tinymce/tinymce).


Here is a brief introduction to the reasons why `tinymce` is recommended: `tinymce` is a veteran to do rich text company(Here also recommended `ckeditor`, is also a company that has been doing rich text, the new version is very good), its products have stood the test of the market, and it has detailed documentation and rich configuration. One of the keys to using rich text is to copy formatting. Before using a Korean text rich `summernote`, It wasted me a lot of time, very unfriendly. But `tinymce`'s formatting is pretty good. It also has a value-added feature is powerpaste, it is extremely powerful, support for copying everything from word or any other place. Extensibility is also critical for rich text. I use `tinymce` to write several plug-ins, learning costs and ease of study are good, and very easy to expand. The last point is that the documentation is very good, basically you want to get the configuration item, it has. Tinymce also supports on-demand loading, you can customize plugins through its official build page.

Let me analyze some of the other rich texts on the market:

* **[summernote](https://github.com/summernote/summernote)** Let me start with a rich text that I definitely would not recommend.It is inconsistent with many recognized default behaviors between others. And only for the use of a dialog feature, they import the boostrapp, A bunch of people protest. Formatting is also very bad. Do not use anyway! Do not use it! Do not use it!

* **[ckeditor](https://github.com/galetahub/ckeditor)** Ckeditor is also a veteran company to do rich text,
I used to use it in company project.This year, the 5.0 version of the UI has also become more beautiful, quite good, and it has the richest plugins. It's recommended that you try it.
* **[quill](https://github.com/quilljs/quill)** Is also a very hot rich text, the skin is very elegant. Writing a plug-in based on it is also very simple. The API design is very cool. The reason I did not choose it was because it was not good for operation picture and was hard to change. If there is no operation of the picture of the user, it is recommended.
* **[medium-*editor*](https://github.com/yabwe/medium-editor)** The famous medium rich text (unofficial produced), but the degree of completion is still not very good, scalability is not bad. However, I think most users still will not be used medium this way of writing.
* **[Squire](https://github.com/neilj/Squire)** A relatively light, rich text, compressed only 11.5kb, relative to other rich text is very small, recommended features is not complicated suggestion.
* **[UEditor](http://ueditor.baidu.com/website/index.html)** 没有深入使用过，只在一个angular1X的项目简单用过，不过说着的ui真的不好看，不符合当今审美了，官方也已经很久没跟新过了。

楼主列举了很多富文本但并没有列举任何 vue 相关的富文本，主要是因为富文本真的比想象中复杂，在前面的文章里也说过了，其实用 vue 封装组件很方便的，没必要去用人家封装的东西什么vue-quill vue-editor这种都只是简单包了一层，没什么难度的。还不如自己来封装，灵活性可控性更强一点。还有一点基于 vue 真没什么好的富文本，不像 react 有 facebook 出的 [draft-js](https://github.com/facebook/draft-js)，ory 出的 [editor](https://github.com/ory/editor)，这种大厂出的产品。


当然你也可以选择一些付费的富文本编辑器，作者自己公司里面有一个项目就使用了 [froala-editor](https://www.froala.com/wysiwyg-editor) 这款编辑器。不管是美观和易用性都是不错的，公司买的是专业版，一年也就 `$349` ，价格也是很合理的，但其实省去的程序员开发成本可能远不止这个价钱。


## Tinymce
这里来简单讲一下在自己项目中使用 `Tinymce` 的方法。

> 由于目前使用 npm 安装 `Tinymce` 方法比较负责复杂而且还有一些问题(日后可能会采用该模式)。:space_invader:

目前采用全局引用的方式。代码地址：`static/tinymce` static目录下的文件不会被打包, 在 index.html 中引入。

**使用**
由于富文本不适合双向数据流，所以只会 watch 传入富文本的内容一次变化，只会就不会再监听了，如果之后还有改变富文本内容的需求。
可以通过 `this.refs.xxx.setContent()` 来设置

源码也很简单，有任何别的需求都可以在 `@/components/Tinymce/index.vue` 中自行修改。
