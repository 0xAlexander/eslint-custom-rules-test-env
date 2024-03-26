The scope of this repo is to confirm custom ESLint rules work as expected. Errors were reported for async functions without try-catch blocks and `.onSnapshot` calls without error handling. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started with the Custom Rules test env

First, isntall:

```bash
npm install
```

Then, link the local rules plugins:

To make ESLint recognize the local plugin: 
1.  in the `eslint-plugin-rules` directory run `npm link`.
2.  in the project's root directory `npm link eslint-plugin-rules`.

This approach is not suitable for deployment or for ensuring that your custom ESLint setup works in environments outside your local development machine. It's for demo purposes that the rules work based on the test cases in `eslintTestCases.tsx`. ESLint expects npm packages.

Finally, build:

```bash
npm run build
```

If linking was done appropriately you should see in your Terminal:

```bash
Failed to compile.

./src/eslintTestCases.tsx
12:1  Error: Async function's body is empty or malformed.  rules/async-function-try-catch
17:1  Error: Async function must be wrapped in a try-catch block.  rules/async-function-try-catch
36:1  Error: .onSnapshot should have an error handling callback.  rules/on-snapshot-error-handling
```

This signifies that custom Val rules are a success and rules are recognized and enforced in the build process via ESLint. Alternatively you can run `npx eslint .`

## Setting Up the Custom ESLint Plugin and Rules

1. **Created the Plugin Directory**: Started by creating a directory named `eslint-plugin-rules` at the root of the project. This directory is where the custom ESLint rules and the plugin's configuration reside.

2. **Develop Custom Rules**: Inside the `eslint-plugin-rules` directory, created js files for each custom rule (`async-function-try-catch.js` and `on-snapshot-error-handling.js`). These files define the behavior of the custom rules using ESLint's rule API as per Val's recommendations.

3. **Configure the Plugin**: In the `eslint-plugin-rules` directory, added an `index.js` and `package.json`. The `index.js` file exports the plugin configuration, including the custom rules and the `package.json` is created to trick ESLint config expecting NPM packages. 

***In a production environtment these are expected to be npm packages***

4. **Link the Plugin Locally**: To make ESLint recognize the local plugin, i had to use `npm link` to create a global symlink for the `eslint-plugin-rules` directory. Then, i linked this symlink to the project by running `npm link eslint-plugin-rules` in the project's root directory. This approach is not suitable for deployment or for ensuring that your custom ESLint setup works in environments outside your local development machine.

Using npm link to create a global symlink for the eslint-plugin-rules directory and linking it to our project works only for local development and it's made so for demonstration purposes of the test cases and eslint rules. However, this approach is not suitable for deployment or for ensuring that custom ESLint setup works in environments outside local development machine. The npm link symlinks are not preserved during the deployment process, and the deployment environment won't have access to local filesystem where the symlink points.

In a production environtment the rules are expected to be npm packages. This Repo is for demo'ing that the rules work.

## Configuring ESLint to Use the Custom Plugin and Rules

1. **Install ESLint and Related Packages**: Made sure TypeScript ESLint parser (`@typescript-eslint/parser`), and the TypeScript ESLint plugin (`@typescript-eslint/eslint-plugin`) were installed in the project.

2. **Update ESLint Configuration**: Modified the project's `.eslintrc.json` to include the custom plugin and its rules:

   ```json
   {
     "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
     "rules": {
       "rules/async-function-try-catch": "error",
       "rules/on-snapshot-error-handling": "error"
     },
     "plugins": [
       "@typescript-eslint",
       "rules"
     ]
   }
   ```

   Here, `"rules"` refers to the local ESLint plugins, and we specify our custom rules under the `"rules"` key.

## Creating Test Cases and Running ESLint

1. **Writing Test Cases**: In (`eslintTestCases.tsx`) you can find code examples specifically designed to trigger the custom ESLint rules. This included async functions both with and without try-catch blocks and `.onSnapshot` method calls with and without error handling.

2. **Running ESLint**: With the test cases in place, we ran ESLint on the project (`npx eslint .`). This step confirms that our custom rules were correctly identifying the intended patterns and that the ESLint setup was properly configured to flag violations of these rules.

### Verifying Rule Functionality

The output from running ESLint confirmed that the custom rules worked as expected. Errors were reported for async functions without try-catch blocks and `.onSnapshot` calls without error handling.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
