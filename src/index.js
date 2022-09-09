//css
import "normalize.css";
import "/main.css";

//polyfills
/*
    import "@babel/polyfill";

    as of parcel < 2 version you cannot specify @babel-preset-env option useBuiltIns
    i hardcoded useBuiltIns: "usage" instead of "entry"/false
    in the file /node_modules/parcel-bundler/src/transforms/babel/env.js @line 56, column 26

    //    useBuiltIns: "usage", //useBuiltIns ? 'entry' : false,

    something something requires this core-js version, so install it separately

    //    corejs: "2.5.7"
*/
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr) {
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]')
            return this.replace(str, newStr);
        return this.replace(new RegExp(str, 'g'), newStr);
    };
}

//react
import React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import store from "/state/store.js";

import Controller from "/components/__controller.jsx";
import Editor from "/pages/Editor.jsx";

render(
    <Provider store={store}>
        <Controller/>
        <Editor/>
    </Provider>,
    document.querySelector("#app")
);
