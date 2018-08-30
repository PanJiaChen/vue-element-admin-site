# Git Hooks

具备基本工程素养的同学都会注重编码规范，而代码风格检查（Code Linting，简称 Lint）是保障代码规范一致性的重要手段。

使用 Lint 会有什么好处呢？在我看来至少具有如下 3 点：

- 更少的 Bug
- 更高的开发效率，Lint 很容易发现低级的、显而易见的错误
- 更高的可读性

很多时候我们`lint`的校验是放在那个在持续集成阶段

> 代码提交 --> 跑 CI 发现问题(远程) --> 本地修复问题 --> 重新提交 --> 通过检查(远程)

但这样有一个问题，我们的 `CI`(持续集成) 往往不是仅仅只做 `Lint`工作，它还有会有很多其它的任务，这样就导致特别的浪费时间，往往可能需要几分钟之后你才会发现问题，或者有的时候你根本就没有发现你的 `CI` 没有跑通过。

常见的流程：本地写好了代码，提交，开始跑 lint，发现不通过，本地修改代码，再提交，在等待 CI 的结果，若还有问题再重复之前的操作。

## husky

最有效的解决方案就是将 `Lint` 校验放到本地，常见做法是使用 [husky](https://github.com/typicode/husky) 或者 [pre-commit](https://github.com/observing/pre-commit) 在本地提交之前做 `Lint`。这里我们选用 `husky`。

```bash
npm install husky -D -S
```

然后修改 package.json，增加配置：

```json
{
  "scripts": {
    "precommit": "eslint src/**/*.js"
  }
}
```

最后尝试 Git 提交，你就会很快收到反馈：

```
git commit -m "Keep calm and commit"
```

但这样会有一个问题，就是这次提交我可能只改了一个文件，比如我就改了 `foo.js` 的文件，但它依然会校验所有`src` 下面的`.js`文件，非常的不友好。导致的问题就是：我提交我写的代码，还先要帮人的代码问题解决了才能提交。

## lint-staged

解决上面的痛点就需要使用 [lint-staged](https://github.com/okonet/lint-staged) 了。它只会校验检查你提交或者说你修改的部分。

```bash
npm install lint-staged -D -S
```

然后，修改 package.json 配置：

```json
"precommit": "lint-staged"

"lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
```

如上配置，每次它只会在你本地 `commit` 之前，校验你提交的内容是否符合你本地配置的 `eslint`规则(这个见文档 [ESLint](eslint.md) )，如果符合则提交成功。如果不符合它会自动执行 `eslint --fix` 尝试帮你自动修复，如果修复成功则会帮你把修复好的代码提交，如果失败，则会提示你错误，让你修好这个错误之后才能允许你提交代码。

## 总结

最佳的 `lint` 规范流程就是推荐团队成员先在自己的编辑器中配置 `eslint`，在 webpack 中配置并开启 `eslint-loader` 错误提示，这样平时写的时候编辑器就能帮你修正一些简单的格式错误，同时提醒你有哪些不符合 `lint` 规范的的地方，并在命令行中提示你错误。这方面详细的内容见 [ESLint](eslint.md)。

但这并不是强制的，有些团队成员或者说刚来的实习生没有在编辑器中配置或者无视命令行中提示的错误，这时候就需要配置`precommit` 这种强制性校验的东西，保证所有提交到远程仓库的内容都是符合团队规范的。
