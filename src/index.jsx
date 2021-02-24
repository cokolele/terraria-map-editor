//css
import "normalize.css";
import "src/main.css";

//react
import { render } from "react-dom";

import { Provider } from "react-redux";
import store from "src/state/store.js";

import Controller from "src/components/__controller.jsx";
import Editor from "src/pages/editor.jsx";

render(
    <Provider store={store}>
        <Controller/>
        <Editor/>
    </Provider>,
    document.querySelector("#app")
);
