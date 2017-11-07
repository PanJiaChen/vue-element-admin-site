管理后台富文本也是一个非常重要的功能，楼主在这里也踩了不少的坑。楼主在项目里最终选择了 [tinymce](https://github.com/tinymce/tinymce)

这里在简述一下推荐使用tinymce的原因：tinymce是一家老牌做富文本的公司(这里也推荐ckeditor，也是一家一直做富文本的公司，也不错)，它的产品经受了市场的认可，不管是文档还是配置的自由度都很好。在使用富文本的时候有一点也很关键就是复制格式化，之前在用一款韩国人做的富文本summernote被它的格式化坑的死去活来，但tinymce的去格式化相当的好，它还有一个增值项目就是powerpaste,那是无比的强大，支持从word里面复制各种东西，都不会有问题。富文本还有一点也很关键，就是拓展性。楼主用tinymce写了好几个插件，学习成本和容易度都不错，很方便拓展。最后一点就是文档很完善，基本你想得到的配置项，它都有。tinymce也支持按需加载，你可以通过它官方的build页定制自己需要的plugins。
我再来分析一下市面上其它的一些富文本：
* **[summernote](https://github.com/summernote/summernote)** 先来说一个我绝对不推荐的富文本。这是一个韩国人开源的富文本(当然不推荐的理由不是因为这个)，它对很多富文本业界公认的默认行为理解是反起到而行的，而且只用了一个dialog的功能，引入了boostrap，一堆人抗议就是不改。格式化也是懒得一批。。反正不要用！不要用！不要用！
* **[ckeditor](https://github.com/galetahub/ckeditor)** ckeditor也是一家老牌做富文本的公司，楼主旧版后台用的就是这个，今年也出了5.0版本，ui也变美观了不少，相当的不错，而且它号称是插件最丰富的富文本了。推荐大家也可以试用一下。
* **[quill](https://github.com/quilljs/quill)** 也是一个非常火的富文本，长相很不错。基于它写插件也很简单，api设计也很简单。楼主不选择它的原因是它对图片的各种操作不友善，而且很难改。如果对图片没什么操作的用户，推荐使用。
* **[medium-*editor*](https://github.com/yabwe/medium-editor)** 大名鼎鼎的medium的富文本(非官方出品)，但完成度还是不很不错，拓展性也不错。不过我觉得大部分用户还是会不习惯medium这种写作方式的。
* **[Squire](https://github.com/neilj/Squire)** 一个比较轻量的富文本，压缩完才11.5kb，相对于其它的富文本来说是非常的小了，推荐功能不复杂的建议使用。
* **[wangEditor](https://github.com/wangfupeng1988/wangEditor)** 一个国人写的富文本，用过感觉还是不错的。不过毕竟是个人的，不像专门公司做富文本的，配置型和丰富性不足。前端几大禁忌就有富文本 [为什么都说富文本编辑器是天坑?](https://www.zhihu.com/question/38699645)，不过个人能做成这样子很不容易了。
* **[百度UEditor](http://ueditor.baidu.com/website/index.html)** 没有深入使用过，只在一个angular1X的项目简单用过，不过说着的ui真的不好看，不符合当今审美了，官方也已经很久没跟新过了。

楼主列举了很多富文本但并没有列举任何 vue 相关的富文本，主要是因为富文本真的比想象中复杂，在前面的文章里也说过了，其实用 vue 封装组件很方便的，没必要去用人家封装的东西什么vue-quill vue-editor这种都只是简单包了一层，没什么难度的。还不如自己来封装，灵活性可控性更强一点。还有一点基于 vue 真没什么好的富文本，不像 react 有 facebook 出的 [draft-js](https://github.com/facebook/draft-js)，ory 出的 [editor](https://github.com/ory/editor)，这种大厂出的产品。
