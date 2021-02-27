import React from "react";

import "/components/styles/input.css";

function InputLink({
      label,
      onClick,
      onBlur,
      onMouseEnter,
      href,
      target,
      className,
      Icon,
      IconLeft,
      IconRight
   }) {

   return (
      <div className={`input-container --link --no-grow ${className ?? ""}`}>
         <a
            className="input-link"
            href={href}
            tabIndex="0"
            target={target || href && "_blank"}
            onMouseDown={onClick}
            onBlur={onBlur}
            onMouseEnter={onMouseEnter}
            onKeyPress={e => (e.key == "Enter" || e.key == " ") && onClick && onClick(e)}
         >
            { IconLeft && <div className="input-icon">{IconLeft}</div> }
            { label && <span className="input-label --emphasis">{label}</span> }
            { IconRight && <div className="input-icon">{IconRight}</div> }
            { Icon && <div className="input-icon">{Icon}</div> }
         </a>
      </div>
   );
}

export default InputLink;
