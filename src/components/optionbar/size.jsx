import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateSetKey } from "/state/modules/app.js";

import OptionbarInputSlider from "/components/inputs/input-slider.jsx";

function OptionbarOptionSize({ stateSetKey, value, onChange }) {
   const [activeSize, setActiveSize] = useState(value);

   const _onChange = (size) => {
      size = parseInt(size);
      setActiveSize(size);
      stateSetKey(["optionbar", "size"], size);
      onChange(size);
   }

   useEffect(() => {
      _onChange(value);
   }, []);

   return <OptionbarInputSlider label="Size" value={activeSize} min={1} max={72} onChange={_onChange} sliderWidth="6rem" input inputMin={1} inputMax={999} inputWidth="5ch"/>;
}

export default connect(
   null,
   { stateSetKey }
)(OptionbarOptionSize);
