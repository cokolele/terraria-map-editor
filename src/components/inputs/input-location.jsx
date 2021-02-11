import React from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import OptionbarInputButton from "/components/inputs/input-button.jsx";
import { LocateIcon } from "/components/icon.jsx";

function InputLocation({
      stateChange,
      label,
      onClick,
      IconLeft,
      IconRight,
      icon,
      className,
      onLocation,
      locationName,
      worldPoint
   }) {

   const _onClick = () => {
      stateChange([
         [["toolbar", "tool"], "worldPoint"],
         [["optionbar", "worldPoint"], worldPoint ?? { locationName, onLocation }]
      ]);

      if (onClick)
         onClick();
   }

   return <OptionbarInputButton onClick={_onClick} Icon={icon && LocateIcon} label={label} IconLeft={IconLeft} IconRight={IconRight} className={className} />
}

export default connect(
   null,
   { stateChange }
)(InputLocation);
