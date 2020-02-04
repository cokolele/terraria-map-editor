import React, { useState } from "react";

import "/components/styles/optionbar/input.css";

//i know...
function OptionbarInputSlider({ label, value, onChange, float, min, max, roundTo = 2, sliderWidth, input, inputWidth, inputMin = min, inputMax = max, className }) {
   const [_value, setValue] = useState(float ? Math.round(value * Math.pow(10, roundTo)) : value);
   const _onChange = (e) => {
      if (float && (e.target.value == "0." || e.target.value == "-0" || e.target.value == "-0.")) {
         setValue(e.target.value);
         onChange(e.target.value);
         return;
      }

      if (isNaN(e.target.value) || (inputMin !== undefined && e.target.value < (float ? inputMin * Math.pow(10, roundTo) : inputMin)) || (inputMax !== undefined && e.target.value > (float ? inputMax * Math.pow(10, roundTo) : inputMax)))
         return;

      if (float) {
         setValue(e.target.value);
         onChange(e.target.value / Math.pow(10, roundTo));
      } else {
         setValue(Math.round(e.target.value));
         onChange(Math.round(e.target.value));
      }
   };

   return (
      <div className={"optionbar-input-container" + (className ? " " + className : "")}>
         {
            label &&
            <span className="optionbar-input-label">{label + ":"}</span>
         }
         <input className="optionbar-input-slider" type="range" min={float ? min * Math.pow(10, roundTo) : min} max={float ? max * Math.pow(10, roundTo) : max} value={_value} onChange={_onChange} style={{width: sliderWidth}}/>
         {
            input &&
            <input className="optionbar-input" type="text" value={(float && (typeof _value == "number" || !_value.endsWith(".")) && _value != "-0") ? _value / Math.pow(10, roundTo) : _value} onChange={(e) => {
               if (e.target.value == "0-" || e.target.value == "-00")
                  e.target.value = "-0";
               if (e.target.value.endsWith("-")) {
                  e.target.value = e.target.value.replace("-", "");
                  e.target.value *= -1;
               }
               if (float && !e.target.value.endsWith(".") && e.target.value != "-0")
                  e.target.value = e.target.value > 0 ? Math.floor(e.target.value * Math.pow(10, roundTo)) : Math.ceil(e.target.value * Math.pow(10, roundTo));
               _onChange(e);
            }} style={{width: inputWidth}}/>
         }
      </div>
   );
}

export default OptionbarInputSlider;
