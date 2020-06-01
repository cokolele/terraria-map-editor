import React from "react";
import useToggle from "/utils/hooks/useToggle.js";
import { connect } from "react-redux";
import { stateToggle } from "/state/state.js";

import { EyeIcon } from "/components/icon.jsx";
import "/components/styles/sidebar/views/layers.css";

import LAYERS from "/utils/dbs/LAYERS.js";

function SidebarCategoryLayers({ layersVisibility, stateToggle }) {
   const onLayerClick = (LAYER) => {
      stateToggle(["layersVisibility", LAYER]);
   }

   return (
      <>
         <div className="sidebar-tab-layers-layer">
            <SidebarCategoryLayersButton onClick={() => {onLayerClick("NPCs")}} visible={layersVisibility.NPCs}/>
            <div className="sidebar-tab-layers-layer-label">NPCs</div>
         </div>
         {
            Object.entries(LAYERS).reverse().map(([LAYERlabel, LAYER], i) => (
               <div className="sidebar-tab-layers-layer" key={i}>
                  <SidebarCategoryLayersButton onClick={onLayerClick} LAYER={LAYER} visible={layersVisibility[LAYER]}/>
                  <div className="sidebar-tab-layers-layer-label">
                     {LAYERlabel.toLowerCase()}
                  </div>
               </div>
            ))
         }
      </>
   );
}

const SidebarCategoryLayersButton = ({ onClick, LAYER, visible }) => {
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
         layersVisibility: state.layersVisibility
      };
   },
   { stateToggle }
)(SidebarCategoryLayers);
