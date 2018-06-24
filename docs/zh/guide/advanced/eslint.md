# ESLint

不管是多人合作还是个人项目，代码规范是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。

## 配置项
所有的配置文件都在 [.eslintrc.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/.eslintrc.js) 中。
本项目基本规范是依托于 vue 官方的 eslint 规则 [eslint-config-vue](https://github.com/vuejs/eslint-config-vue) 做了少许的修改。大家可以按照自己的需求进行定制化配置。

比如：我个人或者项目组习惯于使用两个空格，但你可能觉得四个空格更顺眼，你可以做如下修改。
进入项目 `.eslintrc.js` 中，找到 `indent`，然后修改为 `4` 即可。 还有各种各样的配置信息，详情见 [ESLint 文档](https://eslint.org/docs/rules/)。

## 取消 ESLint 校验
如果你实在是不想使用 ESLint 校验，只要找到 [config/index.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/build/webpack.base.conf.js) 文件。
将 `useEslint: true` 设置为 `useEslint: false` 即可

## vscode 配置 ESLint

这所谓工欲善其事，必先利其器，个人推荐 eslint+vscode 来写 vue，绝对有种飞一般的感觉。效果如图：
![eslintGif.gif](https://wpimg.wallstcn.com/e94a76df-6dc0-4c15-9785-28b553a163e9.png)

<br/>

每次保存，vscode就能标红不符合eslint规则的地方，同时还会做一些简单的自我修正。安装步骤如下：

首先安装eslint插件
![eslint1.png](https://wpimg.wallstcn.com/72f126cb-09eb-4b27-b02e-65e79eb76220.png)

安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 文件 > 首选项 > 设置 打开 VSCode 配置文件,添加如下配置
```

    "files.autoSave":"off",
    "eslint.validate": [
       "javascript",
       "javascriptreact",
       "html",
       { "language": "vue", "autoFix": true }
     ],
     "eslint.options": {
        "plugins": ["html"]
     }

```
这样每次保存的时候就可以根据根目录下.eslintrc.js你配置的eslint规则来检查和做一些简单的fix。每个人和团队都有自己的代码规范，统一就好了，去打造一份属于自己的eslint 规则上传到npm吧，如饿了么团队的 [config](https://www.npmjs.com/package/eslint-config-elemefe)，vue的 [config](https://github.com/vuejs/eslint-config-vue)。

[vscode 插件和配置推荐](https://github.com/varHarrie/Dawn-Blossoms/issues/10)


## 自动修复
```bash
npm run lint -- --fix
```
