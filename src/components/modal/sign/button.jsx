import { ErrorOutlineIcon } from "src/components/icon.jsx";
import "src/components/styles/modal/sign/button.css";

function ModalSignButton({ label, onClick, error }) {
   return (
      <div className="modal-sign-button-container">
         <button type="button" className="modal-sign-button" onClick={onClick}>{label}</button>
         {
            error &&
            <div className="modal-sign-button-error">
               <ErrorOutlineIcon size={"auto"}/>
               {error}
            </div>
         }
      </div>
   );
}

export default ModalSignButton;
