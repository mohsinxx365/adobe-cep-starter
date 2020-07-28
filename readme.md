# 📚 Adobe Cep Starter

> **React , Typescript , Nodejs , Extendscript & Webpack .**

This is a `starter kit` for developing CEP Panels.

This Template does a bunch of things to make your life easier:

- Compile our Typescript code into a single `.js` file.

- Converts `Extendscript` to `jsxbin` .

- Create the necessary xml files

- Create a `symlink` into the extensions folder so you can test out the extension quickly

- Syncs your `node_modules` (**not** the `dev dependencies`) into the bundle

## Step By Step Guide

- Make Sure You Have The Following things downloaded

  ```
   - node.js

   - npm
  ```

- Run The Following Commands :

  ```
  ⚠ Note:

  Dont't Put This Project in the Adobe Extension Folder

  You Can Put This Project in your "desktop" or "documents" folder

  The Remaining Work Will Be taken Care by the build scripts.
  ```

  ```shell
  git clone git@github.com:mohsinxx365/adobe-cep-starter.git

  cd adobe_cep_starter

  npm install

  cd server

  npm install
  ```

* You Can Configure the extension settings in the `pluginrc.js` File

  > 💡 Tip : You can can change all the words from `starter` to your `extension_name`

## Build Scripts

```
⚠ Note:

These Commands are only available in the root directory of the project
```


👇 This will Run the project in the browser with hot reload functionality

```shell
npm start
```

👇 This Will Generate a build folder in your project and Create a symlink in the adobe extension folder path , after running the above command you can `preview` your extension in your `adobe app`

```shell
npm run release:dev
```

👇 This will Generate a production Ready Build Folder And a signed Zxp File

```shell
npm run release:prod
```
