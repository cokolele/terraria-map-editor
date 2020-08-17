import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import InputSlider from "/components/inputs/input-slider.jsx";
import InputCheckbox from "/components/inputs/input-checkbox.jsx";

function OptionbarOptionSize({ stateChange, size }) {
   const [locked, setLocked] = useState(true);

   //when tool is changed the size is kept in state but locked state is reset
   useEffect(() => {
      if (typeof size === "object")
         setLocked(!locked);
   }, []);

   const onChangeLocked = () => {
      if (locked)
         stateChange(["optionbar", "size"], [size, size]);
      else
         stateChange(["optionbar", "size"], size[0]);

      setLocked(!locked);
   }

   const onChangeSize = (size) => {
      stateChange(["optionbar", "size"], parseInt(size));
   }

   const onChangeWidth = (x) => {
      stateChange(["optionbar", "size"], [parseInt(x), size[1]]);
   }

   const onChangeHeight = (y) => {
      stateChange(["optionbar", "size"], [size[0], parseInt(y)]);
   }

   return (
      <>
         <InputCheckbox label="Lock sides" value={locked} onChange={onChangeLocked}/>
         {
            locked ?
               <InputSlider label="Size" value={size} min={1} max={72} onChange={onChangeSize} sliderWidth="6rem" input inputMin={1} inputMax={999} inputWidth="5ch"/>
               :
               <>
                  <InputSlider label="Width" value={size[0]} min={1} max={72} onChange={onChangeWidth} sliderWidth="6rem" input inputMin={1} inputMax={999} inputWidth="5ch"/>
                  <InputSlider label="Height" value={size[1]} min={1} max={72} onChange={onChangeHeight} sliderWidth="6rem" input inputMin={1} inputMax={999} inputWidth="5ch"/>
               </>
         }
      </>
   );
}

export default connect(
   state => {
      return {
         size: state.optionbar.size
      };
   },
   { stateChange }
)(OptionbarOptionSize);
