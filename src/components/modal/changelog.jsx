import changelog from "src/changelog.json";

import "src/components/styles/modal/changelog.css";

function ModalChangelog({ close }) {
   return (
      <div className="modal-sign modal-changelog">
         <div className="modal-text">app version: <span className="modal-text--h2">{changelog.appVersion}</span></div>
         <div className="modal-text">game version: <span className="modal-text--h2">{changelog.ingameSupportedVersion}</span></div>
         <div className="modal-dividerLine"></div>
         <div className="modal-text modal-changelog-changes-container">
            {
               Object.entries(changelog.changelog).map(([version, record], i) => (
                  <div key={i}>
                     <div className="modal-changelog-change-header">
                        <div className="modal-changelog-change-version">{version}</div>
                        <div className="modal-changelog-change-date">{record.date}</div>
                     </div>
                     <ul>
                        {
                           record.changes.map((detail, i) =>
                              <li key={i}>{detail}</li>
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

