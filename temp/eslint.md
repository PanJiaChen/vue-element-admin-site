# ESLint

Whether it's a multi-person collaboration or personal projects, code specifications are important. It can not only largely avoids basic syntax errors, but also ensures the readability of the code.

## Config
All configuration files are in [.eslintrc.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/.eslintrc.js).
The basic eslint rules of this project is based on the official eslint rules of vue [eslint-config-vue](https://github.com/vuejs/eslint-config-vue) but made minor changes. You can customize your configuration according to your needs.

Such as: my personal or project team is accustomed to using two spaces, but you may feel that the four spaces are more pleasing, and you can make the following changes.

Enter the project of `.eslintrc.js`, find `indent`,and then set it to `4` 。There are a variety of configuration information, see details [ESLint Documention](https://eslint.org/docs/rules/)。

## Cancel ESLint
If you really don't want to use ESLint,you just find [config/index.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/build/webpack.base.conf.js).
And then set `useEslint: true` to `useEslint: false` .

## Configure ESLint in vscode

Sharp tools make good work! Personally recommend eslint+vscode to write VUE, there is definitely a very cool
![eslintGif.gif](https://wpimg.wallstcn.com/e94a76df-6dc0-4c15-9785-28b553a163e9.png)

<br/>

Every time you save your code, vscode will be able to mark red areas that do not conform to the eslint rules, and make some simple self-fixes at the same time. The installation steps are as follows:

First install the eslint plugin
![eslint1.png](https://wpimg.wallstcn.com/72f126cb-09eb-4b27-b02e-65e79eb76220.png)


After we have installed ESLint, we back to VSCode to set up . Go to `Code` > `Preferences` > `Settings` and add the following configuration.
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
Everyone and the team have their own code specification, unification is good, to create their own eslint rules and upload it to the npm will be fun. Such as ElemeFE [config](https://www.npmjs.com/package/eslint-config-elemefe) or Vue official  [config](https://github.com/vuejs/eslint-config-vue).

[vscode plugin and configuration recommendations](https://github.com/varHarrie/Dawn-Blossoms/issues/10)

## auto fix
```bash
npm run lint -- --fix
```
