# Cep Starter Kit with React & Typescript

This is a "starter kit" for developing CEP Panels.

It relies on `webpack` and `npm scripts` to do the heavy lifting :

This Template does a bunch of things to make your life easier:

- Compile our Typescript code into a single `.js` file.
- Converts `Extendscript`  to `jsxbin` .
- Create the necessary xml files
- Create a `symlink` into the extensions folder so you can test out the extension quickly
- Syncs your `node_modules`(**not** the `dev dependencies`) into the bundle
- Copy Your assets (`fonts,svg's,css,scss` whatever you like) into the bundle



## Requirements:

- node.js
- npm

## Installing :

``` shell
git clone git@github.com:adobe-extension-tools/cep-starter.git

cd cep-starter

npm install
```

## Developing :

- `npm run serve` : runs the extension in the browser at localhost:8080 by default

- `npm run release:dev`  : will build, deploy and archive the extension

- `npm run release:prod`  : will build and deploy the extension
