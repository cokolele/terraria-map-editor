//css
import "normalize.css";
import "/main.css";

//polyfills
/*
    import "@babel/polyfill";

    as of parcel < 2 version you cannot specify @babel-preset-env option useBuiltIns
    since this is such a small app and loading whole polyfill package would double the size
    i hardcoded useBuiltIns: "usage" instead of "entry"/false
    in the file /node_modules/parcel-bundler/src/transforms/babel/env.js @line 56, column 26

    //    useBuiltIns: "usage", //useBuiltIns ? 'entry' : false,

    something something requires this core-js version, so install it separately

    //    corejs: "2.5.7"
*/

//react
import React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import store from "/state/store.js";

import Editor from "/pages/editor.jsx";

import { onPageLoad } from "/app/app.js";

onPageLoad();

render(
    <Provider store={store}>
        <Editor />
    </Provider>,
    document.querySelector("#app")
);
