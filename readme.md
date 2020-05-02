<!--
  Title: terraria web editor
  Description: Terraria world file editor in browser
  Author: cokolele
  Tags: terraria, world file, file structure, file dumper, file format, documentation, data, parsing, parser, map viewer, tool, javascript, node, browser, saver, editor, save, edit
  -->

# Terraria web editor

Terraria world file editor in browser

\- supports only maps generated in 1.3.5.3

Feel free to contribute 🌳

## Preview

![Image of Yaktocat](https://raw.githubusercontent.com/cokolele/terraria-web-editor/master/preview.png)

## Installation

\#>git clone https://github.com/cokolele/terraria-map-editor
<br>\#>npm install
<br>(if you can fix unexpected config errors yourself:
<br>&nbsp;&nbsp;&nbsp;&nbsp;\#>npm audit fix
<br>&nbsp;&nbsp;&nbsp;&nbsp;\#>npm update
<br>)
<br>\#>git submodule init
<br>\#>git submodule update
<br>\#>npm install core-js@2.5.7 --save-dev
<br>go to */node_modules/parcel-bundler/src/transforms/babel/env.js @line 54* and change the line to<br>
```javascript
useBuiltIns: "usage",
```
<br>(changing getEnvPlugins options for babel to import unly used polyfills)
<br>\#>npm start

#### API installation (mysql/mariadb)

\#>cd express-server
<br>\#>npm install
<br>\>create a file */configs/secrets.js* with a content<br>
```javascript
module.exports = {
    dbRootPass: "replace this with your database password",
    sessionSecret: "replace this with your express session secret",
};
```
<br>\>setup your profiles in */configs/profiles/*
<br>\>run */configs/sql/twe_create.sql* in you database
<br>\#>npm run api:start