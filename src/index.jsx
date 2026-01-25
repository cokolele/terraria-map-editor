import 'normalize.css'
import '/main.css'

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import store from '/state/store.js'

import Controller from '/components/__controller.jsx'
import Editor from '/pages/Editor.jsx'

render(
   <Provider store={store}>
      <Controller />
      <Editor />
   </Provider>,
   document.querySelector('#app'),
)
