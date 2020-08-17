import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import OptionbarInput from "/components/inputs/input.jsx";
import OptionbarInputSlider from "/components/inputs/input-slider.jsx";
import OptionbarInputSelect from "/components/inputs/input-select.jsx";
import OptionbarInputCheckbox from "/components/inputs/input-checkbox.jsx";

import { ToolTileInfo } from "/components/icon.jsx";
import "/components/styles/sidebar/views/tileInfo.css";

const TileInfoNoTool = () => (
   <div className="sidebar-view-tileInfo-text">
      <span>Please select the </span>
      <div className="toolbar-tool toolbar-tool--selected"><ToolTileInfo/></div>
      <span> Tile info tool</span>
   </div>
);

const TileInfoNoTile = () => (
   <div className="sidebar-view-tileInfo-text">Click on the tile you want to know more about</div>
);

function SidebarViewTileInfo({ tool, tileData, stateChange }) {
   if (tool != "tileInfo")
      return <TileInfoNoTool/>;
   else if (tileData === null)
      return <TileInfoNoTile/>;

   const [tile, setTile] = useState({
      colors: {},
      liquid: {},
      wiring: { wires: {} }
   });

   useEffect(() => {
      console.log(tileData);
      setTile({
         colors: {},
         liquid: {},
         wiring: { wires: {} },
         ...tileData
      });
   }, [tileData]);

   const setTileData = (key, value) => {
      if (typeof key == "string")
         tile[key] = value;
      else if (key[0] == "wire")
         tile.wiring.wires[key[1]] = value;
      else
         tile[key[0]][key[1]] = value;

      console.log(tile);
      setTile({...tile});
   }

   return (
      <div className="sidebar-view-general">
         <div className="sidebar-view-general-row-divider"><span>Tile</span></div>
         <span>Tile ID</span>
         <OptionbarInput value={tile.blockId !== undefined ? tile.blockId : ""} onChange={(value) => {setTileData("blockId", value)}} int canBeNull min={0} max={469} width="14ch"/>
         <span>Tile color</span>
         <div className="sidebar-view-general-row-value">{tile.colors.block !== undefined ? tile.colors.block : ""}</div>
         <span>Slope</span>
         <OptionbarInputSelect value={tile.slope !== undefined ? tile.slope : ""} options={[["None", ""], ["Half", "half"], ["Top right", "TR"], ["Top left", "TL"], ["Bottom right", "BR"], ["Bottom left", "BL"]]} onChange={(value) => {setTileData("slope", value)}}/>
         <span>Frame x</span>
         <OptionbarInput value={tile.frameX !== undefined ? tile.frameX : ""} onChange={(value) => {setTileData("frameX", value)}} int canBeNull min={0} width="14ch"/>
         <span>Frame y</span>
         <OptionbarInput value={tile.frameY !== undefined ? tile.frameY : ""} onChange={(value) => {setTileData("frameY", value)}} int canBeNull min={0} width="14ch"/>
         <div className="sidebar-view-general-row-divider"><span>Wall</span></div>
         <span>Wall ID</span>
         <OptionbarInput value={tile.wallId !== undefined ? tile.wallId : ""} onChange={(value) => {setTileData("wallId", value)}} int canBeNull min={1} max={315} width="14ch"/>
         <span>Wall color</span>
         <div className="sidebar-view-general-row-value">{tile.colors.wall !== undefined ? tile.colors.wall : ""}</div>
         <div className="sidebar-view-general-row-divider"><span>Liquid</span></div>
         <span>Type</span>
         <OptionbarInputSelect value={tile.liquid.type !== undefined ? tile.liquid.type : ""} options={[["None", ""], ["Water", "water"], ["Lava", "lava"], ["Honey", "honey"]]} onChange={(value) => {setTileData(["liquid", "type"], value)}}/>
         <span>Amount</span>
         <OptionbarInputSlider value={tile.liquid.amount !== undefined ? tile.liquid.amount : 0} onChange={(value) => {setTileData(["liquid", "amount"], value)}} min={0} max={255} input inputWidth="7ch"/>
         <div className="sidebar-view-general-row-divider"><span>Wiring</span></div>
         <span>Red wire</span>
         <OptionbarInputCheckbox value={tile.wiring.wires.red ? true : false} onChange={(value) => {setTileData(["wire", "red"], value)}} />
         <span>Green wire</span>
         <OptionbarInputCheckbox value={tile.wiring.wires.green ? true : false} onChange={(value) => {setTileData(["wire", "green"], value)}} />
         <span>Blue wire</span>
         <OptionbarInputCheckbox value={tile.wiring.wires.blue ? true : false} onChange={(value) => {setTileData(["wire", "blue"], value)}} />
         <span>Yellow wire</span>
         <OptionbarInputCheckbox value={tile.wiring.wires.yellow ? true : false} onChange={(value) => {setTileData(["wire", "yellow"], value)}} />
         <span>Has actuator</span>
         <OptionbarInputCheckbox value={tile.wiring.actuator ? true : false} onChange={(value) => {setTileData(["wiring", "actuator"], value)}} />
         <span>Is actuated</span>
         <OptionbarInputCheckbox value={tile.wiring.actuated ? true : false} onChange={(value) => {setTileData(["wiring", "actuated"], value)}} />
      </div>
   )
}

export default connect(
   state => {
      return {
         tool: state.toolbar.tool,
         tileData: state.tileData
      };
   },
   { stateChange }
)(SidebarViewTileInfo);
