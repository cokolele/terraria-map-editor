<!--
  Title: terraria web editor
  Description: Terraria world file editor in browser
  Author: cokolele
  Tags: terraria, world file, file structure, file dumper, file format, documentation, data, parsing, parser, map viewer, tool, javascript, node, browser, saver, editor, save, edit
  -->

# Terraria web editor

Terraria world file editor in browser

\- supports maps from 1.3.5.3 to 1.4.0.5

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
(changing getEnvPlugins options for babel to import only used polyfills)
<br>\#>npm start

#### [API](https://github.com/cokolele/terraria-map-editor-api "terraria-map-editor-api")

