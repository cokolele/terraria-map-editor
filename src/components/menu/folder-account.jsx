import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeModal } from "/state/modules/app.js";

import { AccountBoxIcon } from "/components/icon.jsx";
import MenuOption from "/components/menu/option.jsx";
import "/components/styles/menu/folder.css";
import "/components/styles/menu/folder-account.css";

function MenuFolderAccount({ loggedIn, user, changeModal }) {

   const onClick = e => {
      if (!loggedIn)
         changeModal("signin");
      else
         changeModal("account");
   }

   return (
      <div className="menu-folder-container menu-folder-container--icon" onClick={onClick}>
         <span>{loggedIn ? user.username : "Account"}</span>
         <AccountBoxIcon/>
      </div>
   )
}

export default connect(state => {
      return {
         loggedIn: state.app.loggedIn,
         user: state.app.user
      };
   },
   { changeModal }
)(MenuFolderAccount);
