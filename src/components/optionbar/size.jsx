import React from "react";

import InputSlider from "/components/inputs/input-slider.jsx";
import InputCheckbox from "/components/inputs/input-checkbox.jsx";

function OptionbarOptionSize({ state, setState }) {
   const onChangeLocked = () => {
      if (state.locked)
         setState({...state, locked: false});
      else
         setState({...state, locked: true, size:[state.size[0], state.size[0]]});
   }

   const onChangeWidth = (x) => {
      if (state.locked)
         setState({...state, size: [parseInt(x), parseInt(x)]});
      else
         setState({...state, size: [parseInt(x), state.size[1]]});
   }

   const onChangeHeight = (y) => {
      setState({...state, size: [state.size[0], parseInt(y)]});
   }

   return (
      <>
         <InputCheckbox label="Lock sides" value={state.locked} onChange={onChangeLocked}/>
         {
            state.locked ?
               <InputSlider label="Size" value={state.size[0]} min={1} max={72} onChange={onChangeWidth} sliderWidth="6rem" input inputMin={1} inputMax={999} inputWidth="5ch"/>
               :
               <>
                  <InputSlider label="Width" value={state.size[0]} min={1} max={72} onChange={onChangeWidth} sliderWidth="6rem" input inputMin={1} inputMax={999} inputWidth="5ch"/>
                  <InputSlider label="Height" value={state.size[1]} min={1} max={72} onChange={onChangeHeight} sliderWidth="6rem" input inputMin={1} inputMax={999} inputWidth="5ch"/>
               </>
         }
      </>
   );
}

export default OptionbarOptionSize;
