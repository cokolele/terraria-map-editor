import React, { useEffect } from "react";
import { connect } from "react-redux";
import { stateChangeModal } from "/state/modules/app.js";

import { AccountBoxIcon } from "/components/icon.jsx";
import MenuOption from "/components/menu/option.jsx";
import "/components/styles/menu/folder.css";

import { GithubIcon } from "/components/icon.jsx";

function MenuFolderAccount({ loggedIn, user, stateChangeModal, __templink }) {

   const onClick = e => {
      if (__templink) {
         const win = window.open("https://github.com/cokolele/terraria-web-editor", '_blank');
         win.focus();
         return;
      }

      if (!loggedIn)
         stateChangeModal("signin");
      else
         stateChangeModal("account");
   }

   return (
      <div className="menu-folder-container menu-folder-container--icon" onClick={onClick}>
      {
         __templink ?
         <>
            <span>Github</span>
            <GithubIcon size="20"/>
         </>
         :
         <>
            <span>{loggedIn ? user.username : "Account"}</span>
            <AccountBoxIcon/>
         </>
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
   { stateChangeModal }
)(MenuFolderAccount);
