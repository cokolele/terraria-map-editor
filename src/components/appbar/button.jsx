import React from "react";

import "/components/styles/appbar/button.css";

function AppbarButton({ Icon, onClick }) {
   return (
      <button type="button" className="appbar-button" onClick={onClick}>
         <Icon/>
      </button>
   );
}

export default AppbarButton;
