import React from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import InputSlider from "/components/inputs/input-slider.jsx";

function OptionbarOptionSize({ stateChange, size }) {
   const onChange = (size) => {
      size = parseInt(size);
      stateChange(["optionbar", "size"], size);
   }

   return <InputSlider label="Size" value={size} min={1} max={72} onChange={onChange} sliderWidth="6rem" input inputMin={1} inputMax={999} inputWidth="5ch"/>;
}

export default connect(
   state => {
      return {
         size: state.optionbar.size
      };
   },
   { stateChange }
)(OptionbarOptionSize);
