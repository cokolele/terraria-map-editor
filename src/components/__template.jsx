import React from "react";

import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import "/components/styles/";

function Template() {
   return "test";
}

export default Template;

export default connect(state => {
   return {
      prop: state.prop,
   };
})(Template);

export default connect(
   state => {
      return {
         prop: state.prop,
      };
   },
   { stateChange }
)(Template);

export default connect(
   null,
   { stateChange }
)(Template);
