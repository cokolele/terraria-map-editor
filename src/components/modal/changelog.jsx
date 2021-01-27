import React from "react";

import { appVersion, ingameSupportedVersion, changelog } from "/changelog.json";

import "/components/styles/modal/changelog.css";

function ModalChangelog({ close }) {

   return (
      <div className="modal-sign modal-changelog">
         <div className="modal-text">app version: <span className="modal-text--h2">{appVersion}</span></div>
         <div className="modal-text">game version: <span className="modal-text--h2">{ingameSupportedVersion}</span></div>
         <div className="modal-dividerLine"></div>
         <div className="modal-text modal-changelog-changes-container">
            {
               Object.entries(changelog).map(([version, record]) => (
                  <div>
                     <div className="modal-changelog-change-header">
                        <div className="modal-changelog-change-version">{version}</div>
                        <div className="modal-changelog-change-date">{record.date}</div>
                     </div>
                     <ul>
                        {
                           record.changes.map(detail =>
                              <li>{detail}</li>
                           )
                        }
                     </ul>
                  </div>
               ))
            }
         </div>
      </div>
   );
}

export default ModalChangelog;

