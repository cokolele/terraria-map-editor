import React, { useEffect } from "react";
import useToggle from "/utils/hooks/useToggle.js";
import { connect } from "react-redux";
import { changeModal } from "/state/modules/app.js";

import { AccountBoxIcon } from "/components/icon.jsx";
import MenuOption from "/components/menu/option.jsx";
import "/components/styles/menu/folder.css";
import "/components/styles/menu/folder-account.css";

function MenuFolderAccount({ loggedIn, user, changeModal }) {
   const [showDropdown, toggleDropdown] = useToggle(false, true);

   const onClick = e => {
      if (!showDropdown && !loggedIn)
         changeModal("login");
      else
         toggleDropdown();
   }

   const onBlur = e => {
      if (showDropdown)
         toggleDropdown();
   }

   return (
      <div className={"menu-folder-container menu-folder-container--icon" + (showDropdown ? " menu-folder-container--opened" : "")} onClick={onClick} onBlur={onBlur} tabIndex="4">
         <span>{loggedIn ? user.username : "Account"}</span>
         <AccountBoxIcon/>
         {
            showDropdown &&
            <div className="menu-folder-account"></div>
         }
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
