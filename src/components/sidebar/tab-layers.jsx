import React from "react";
import useToggle from "/utils/hooks/useToggle.js";
import { connect } from "react-redux";
import { stateToggleLayerVisibility } from "/state/modules/app.js";

import { EyeIcon } from "/components/icon.jsx";
import "/components/styles/sidebar/tab-layers.css";

import LAYERS from "/app/canvas/enum-LAYERS.js";

function TabLayers({ layersVisibility, stateToggleLayerVisibility }) {
   const onLayerClick = (LAYER) => {
      stateToggleLayerVisibility(LAYER);
   }

   return (
      <>
         {
            Object.entries(LAYERS).reverse().map(([LAYERlabel, LAYER], i) => (
               <div className="sidebar-tab-layers-layer" key={i}>
                  <TabLayersLayerButton onClick={onLayerClick} LAYER={LAYER} visible={layersVisibility[LAYER]}/>
                  <div className="sidebar-tab-layers-layer-label">
                     {LAYERlabel.toLowerCase()}
                  </div>
               </div>
            ))
         }
      </>
   );
}

const TabLayersLayerButton = ({ onClick, LAYER, visible }) => {
   const [checked, toggleChecked] = useToggle(visible, !visible);
   const _onClick = () => {
      toggleChecked();
      onClick(LAYER);
   }

   return (
      <div className="sidebar-tab-layers-layer-button" onClick={_onClick}>
      {
         checked &&
         <EyeIcon size="1rem"/>
      }
      </div>
   );
}

export default connect(
   state => {
      return {
         layersVisibility: state.app.layersVisibility
      };
   },
   { stateToggleLayerVisibility }
)(TabLayers);
