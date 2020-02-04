import React from "react";

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
   { changeState }
)(Template);

export default connect(
   null,
   { changeState }
)(Template);
