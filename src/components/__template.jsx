import { connect } from "react-redux";
import { stateChange } from "src/state/state.js";

import "src/components/styles/";

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
