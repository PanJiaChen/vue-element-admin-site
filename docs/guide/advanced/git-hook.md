# Git Hooks

Programmers with basic engineering literacy will focus on coding specifications, and Code Linting (Lint) is an important means of ensuring code specification consistency.

What are the benefits of using Lint? In my opinion, it has at least the following three points:

- Fewer bugs
- With higher development efficiency, Lint can easily find low-level, obvious errors.
- Higher readability

Many times our `lint` check is placed in the continuous integration phase.

> Push Code --> Run CI find problem(remote) --> Fixed in local --> Push Again --> Pass CI(remote)

But there is a problem with this. Our `CI` (continuous integration) often doesn't just do `Lint` work, it also has many other tasks, which leads to a special waste of time, often it may take a few minutes after you In order to know that there is a problem, or sometimes you have not found that your `CI` did not pass.

Common process: write the code locally, submit, start running lint, find the failure to pass, modify the code locally, submit again, wait for the result of CI, and repeat the previous operation if there are any problems.

## husky

The most effective solution is to put the `Lint` check locally. The common practice is to use
[husky](https://github.com/typicode/husky) or [pre-commit](https://github.com/observing/pre-commit) do `Lint` before committing locally. Here we use `husky`.

```bash
npm install husky -D -S
```

Then modify package.json to add configuration:

```json
{
  "scripts": {
    "precommit": "eslint src/**/*.js"
  }
}
```

Finally try Git commit and you will receive feedback soon:

```
git commit -m "Keep calm and commit"
```

But there is a problem. This is that I may only change one file for this commit. For example, I changed the file of `foo.js`, but it will still check all the `.js` files under `src`. Very unfriendly. The problem is that I submitted the code I wrote, but I need to solve the other people code problem before.

## lint-staged

To solve the above pain points, you need to use [lint-staged](https://github.com/okonet/lint-staged). It will only check the parts that you submitted or you modified.

```bash
npm install lint-staged -D -S
```

Then, modify the package.json configuration:

```json
"precommit": "lint-staged"

"lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
```

As configured above, Verify that the code you submitted matches the `eslint`( [ESLint](eslint.md) ) rule of your local configuration, before your local `commit`. If it is met, the submission is successful. If it doesn't match, it will automatically execute `eslint --fix` to try to help you fix it automatically. If the repair is successful, it will help you to submit the repaired code. If it fails, it will prompt you have an error, and you will be able to submit the code after you fix it.

## SumUp

The best `lint` specification process is to recommend team members to configure `eslint` in their own editor, configure and enable the `eslint-loader` error in webpack, so the editor can help you fix some simple formatting errors and remind you of some places that don't meet the `lint` specification. And prompt you for errors on the command line. See the details [ESLint](eslint.md)。

But this is not mandatory. Some team members or newly arrived interns are not configured in the editor or ignore the error in the command line. In this case, you need to configure the mandatory checker of `precommit` to ensure that All code submitted to the remote repository is team compliant.
