import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js"

import OptionbarInput from "/components/inputs/input.jsx";
import OptionbarInputSlider from "/components/inputs/input-slider.jsx";
import OptionbarInputSelect from "/components/inputs/input-select.jsx";
import OptionbarInputCheckbox from "/components/inputs/input-checkbox.jsx";
import "/components/styles/sidebar/views/general.css";

import LAYERS from "/utils/dbs/LAYERS.js";
//import editTiles from "/canvas/extensions/editTiles.js";

function SidebarCategoryGeneral({ worldObject, stateChange, unsafeOnlyTiles }) {
   const [header, setHeader] = useState(worldObject.header);
   const version = worldObject.fileFormatHeader.version;

   const setHeaderKey = (key, value, index) => {
      if (key == "worldSurface") {
         /*
         if (value > header.worldSurface)
            editTiles(LAYERS.BACKGROUND, "sky", [0, header.worldSurface], [header.maxTilesX, value]);
         else
            editTiles(LAYERS.BACKGROUND, "ground", [0, value], [header.maxTilesX, header.worldSurface]);
         */
         if (value >= header.rockLayer)
            header.rockLayer = value;
      }
      else if (key == "rockLayer") {
         /*
         if (value > header.rockLayer)
            editTiles(LAYERS.BACKGROUND, "ground", [0, header.rockLayer], [header.maxTilesX, value]);
         else
            editTiles(LAYERS.BACKGROUND, "cavern", [0, value], [header.maxTilesX, header.rockLayer]);
         */
         if (value <= header.worldSurface)
            header.worldSurface = value;
      }
      else if (key == "treeX") {
         switch (index) {
            case 0:
               if (value >= header.treeX[1] && value < header.maxTilesX - 2) {
                  header.treeX[1] = value + 1;
                  if (header.treeX[1] >= header.treeX[2])
                     header.treeX[2] = value + 2;
               } else if (value > header.maxTilesX - 2) {
                  value = header.maxTilesX - 2;
                  header.treeX[1] = value + 1;
                  header.treeX[2] = value + 2;
               }
               break;
            case 1:
               if (value <= header.treeX[0] && value > 1) {
                  header.treeX[0] = value - 1;
               } else if (value < 1) {
                  header.treeX[0] = 0;
                  value = 1;
               } else if (value >= header.treeX[2] && value < header.maxTilesX - 1) {
                  header.treeX[2] = value + 1;
               } else if (value > header.maxTilesX - 1) {
                  value = header.maxTilesX - 1;
                  header.treeX[2] = header.maxTilesX;
               }
               break;
            case 2:
               if (value <= header.treeX[1] && value > 2) {
                  header.treeX[1] = value - 1;
                  if (header.treeX[1] <= header.treeX[0])
                     header.treeX[0] = value - 2;
               } else if (value < 2) {
                  value = 2;
                  header.treeX[1] = 1;
                  header.treeX[0] = 0;
               }
               break;
         }
      }
      else if (key == "caveBackX") {
         switch (index) {
            case 0:
               if (value >= header.caveBackX[1] && value < header.maxTilesX - 2) {
                  header.caveBackX[1] = value + 1;
                  if (header.caveBackX[1] >= header.caveBackX[2])
                     header.caveBackX[2] = value + 2;
               } else if (value > header.maxTilesX - 2) {
                  value = header.maxTilesX - 2;
                  header.caveBackX[1] = value + 1;
                  header.caveBackX[2] = value + 2;
               }
               break;
            case 1:
               if (value <= header.caveBackX[0] && value > 1) {
                  header.caveBackX[0] = value - 1;
               } else if (value < 1) {
                  header.caveBackX[0] = 0;
                  value = 1;
               } else if (value >= header.caveBackX[2] && value < header.maxTilesX - 1) {
                  header.caveBackX[2] = value + 1;
               } else if (value > header.maxTilesX - 1) {
                  value = header.maxTilesX - 1;
                  header.caveBackX[2] = header.maxTilesX;
               }
               break;
            case 2:
               if (value <= header.caveBackX[1] && value > 2) {
                  header.caveBackX[1] = value - 1;
                  if (header.caveBackX[1] <= header.caveBackX[0])
                     header.caveBackX[0] = value - 2;
               } else if (value < 2) {
                  value = 2;
                  header.caveBackX[1] = 1;
                  header.caveBackX[0] = 0;
               }
               break;
         }
      }

      if (index !== undefined) {
         header[key][index] = value;
      }
      else {
         header[key] = value;
      }

      setHeader({...header});
      stateChange(["canvas", "worldObject"], {...worldObject, header});
   }

   if (unsafeOnlyTiles)
      return (
         <div className="sidebar-view-general--disabled">
            <div style={{fontSize: "5rem"}}>:(</div>
            <br/>
            <div style={{lineHeight: "2rem"}}>
               No data are retrieved from the map file when only tiles loading is activated. Sorry
            </div>
         </div>
      )

   return (
      <div className="sidebar-view-general">
         <span>World name</span>
         <OptionbarInput value={header.mapName} onChange={(value) => {setHeaderKey("mapName", value)}} />
         <span>World ID</span>
         <div className="sidebar-view-general-row-value">{header.worldId}</div>
         <span>Seed</span>
         <div className="sidebar-view-general-row-value">{header.seedText}</div>
         <span>Revision</span>
         <div className="sidebar-view-general-row-value">{worldObject.fileFormatHeader.revision}</div>
         <span>World size in block</span>
         <div className="sidebar-view-general-row-value">{`${header.maxTilesX} x ${header.maxTilesY}`}</div>
         <span>World size in pixels</span>
         <div className="sidebar-view-general-row-value">{`${header.rightWorld} x ${header.bottomWorld}`}</div>
         <span>Spawn point</span>
         <div className="sidebar-view-general-row-spanner">
            x:
            <OptionbarInput value={header.spawnTileX} onChange={(value) => {setHeaderKey("spawnTileX", value)}} int min={0} max={header.maxTilesX}/>
            y:
            <OptionbarInput value={header.spawnTileY} onChange={(value) => {setHeaderKey("spawnTileY", value)}} int min={0} max={header.maxTilesY}/>
         </div>
         <span>Dungeon point</span>
         <div className="sidebar-view-general-row-spanner">
            x:
            <OptionbarInput value={header.dungeonX} onChange={(value) => {setHeaderKey("dungeonX", value)}} int min={0} max={header.maxTilesX}/>
            y:
            <OptionbarInput value={header.dungeonY} onChange={(value) => {setHeaderKey("dungeonY", value)}} int min={0} max={header.maxTilesY}/>
         </div>
         <span>Cavern level</span>
         <OptionbarInputSlider value={header.worldSurface} onChange={(value) => {setHeaderKey("worldSurface", value)}} min={0} max={header.maxTilesY} input inputWidth="6ch"/>
         <span>Underground level</span>
         <OptionbarInputSlider value={header.rockLayer} onChange={(value) => {setHeaderKey("rockLayer", value)}} min={0} max={header.maxTilesY} input inputWidth="6ch"/>

         <div className="sidebar-view-general-row-divider"><span>Events:</span></div>

         <span>Blood moon</span>
         <OptionbarInputCheckbox value={header.tempBloodMoon} onChange={(value) => {setHeaderKey("tempBloodMoon", value)}} />
         <span>Eclipse</span>
         <OptionbarInputCheckbox value={header.tempEclipse} onChange={(value) => {setHeaderKey("tempEclipse", value)}} />
         <span>Spawn meteor</span>
         <OptionbarInputCheckbox value={header.spawnMeteor} onChange={(value) => {setHeaderKey("spawnMeteor", value)}} />
         <span>Invasion</span>
         <OptionbarInputSelect value={header.invasionType} options={[["None", 0], ["Goblin invasion", 1], ["Frost legion", 2], ["Pirate invasion", 3], ["Martian madness", 4]]} onChange={(value) => {setHeaderKey("invasionType", value)}}/>
         <span>Invasion size</span>
         <div className="sidebar-view-general-row-spanner">
            <OptionbarInputSlider value={header.invasionSizeStart} onChange={(value) => {setHeaderKey("invasionSizeStart", value)}} min={0} max={10400} input inputWidth="7ch"/>
            = 100%
         </div>
         <span>Invasion progress</span>
         <div className="sidebar-view-general-row-spanner">
            0%
            <OptionbarInputSlider value={header.invasionSize} onChange={(value) => {setHeaderKey("invasionSize", value)}} min={0} max={header.invasionSizeStart}/>
            100%
         </div>
         <span>Slime rain time</span>
         <OptionbarInputSlider value={header.slimeRainTime} onChange={(value) => {setHeaderKey("slimeRainTime", value)}} min={-604800} max={54000} input inputWidth="9ch"/>
         <span>Cultists cooldown</span>
         <OptionbarInputSlider value={header.tempCultistDelay} onChange={(value) => {setHeaderKey("tempCultistDelay", value)}} min={0} max={86400} input inputWidth="7ch"/>
         {
            version >= 225 &&
            <>
               <span>Lantern night cooldown</span>
               <OptionbarInputSlider value={header.lanternNightCooldown} onChange={(value) => {setHeaderKey("lanternNightCooldown", value)}} min={0} max={11} input inputWidth="7ch"/>
               <span>Lantern night started by world</span>
               <OptionbarInputCheckbox value={header.lanternNightGenuine} onChange={(value) => {setHeaderKey("lanternNightGenuine", value)}} />
               <span>Lantern night started by player</span>
               <OptionbarInputCheckbox value={header.lanternNightManual} onChange={(value) => {setHeaderKey("lanternNightManual", value)}} />
               <span>Next night will be latern night</span>
               <OptionbarInputCheckbox value={header.lanternNightNextNightIsGenuine} onChange={(value) => {setHeaderKey("lanternNightNextNightIsGenuine", value)}} />
               <span>Force Halloween invasion</span>
               <OptionbarInputCheckbox value={header.forceHalloweenForToday} onChange={(value) => {setHeaderKey("forceHalloweenForToday", value)}} />
               <span>Force Christmas invasion</span>
               <OptionbarInputCheckbox value={header.forceXMasForToday} onChange={(value) => {setHeaderKey("forceXMasForToday", value)}} />
            </>
         }

         <div className="sidebar-view-general-row-divider"><span>Flags:</span></div>

         {
            version >= 225 ?
               <>
                  <span>Game mode</span>
                  <OptionbarInputSelect value={header.gameMode} options={[["Normal", 0], ["Expert", 1], ["Master", 2], ["Journey/Creative", 3]]} onChange={(value) => {setHeaderKey("gameMode", value)}}/>
                  <span>Drunk world (seed)</span>
                  <OptionbarInputCheckbox value={header.drunkWorld} onChange={(value) => {setHeaderKey("drunkWorld", value)}} />
                  {
                     version >= 227 &&
                     <>
                        <span>Good world (seed)</span>
                        <OptionbarInputCheckbox value={header.getGoodWorld} onChange={(value) => {setHeaderKey("getGoodWorld", value)}} />
                     </>
                  }
               </>
            :
               <>
                  <span>Expert mode</span>
                  <OptionbarInputCheckbox value={header.expertMode} onChange={(value) => {setHeaderKey("expertMode", value)}} />
               </>
         }
         <span>Crimson world</span>
         <OptionbarInputCheckbox value={header.crimson} onChange={(value) => {setHeaderKey("crimson", value)}} />
         <span>Hard mode</span>
         <OptionbarInputCheckbox value={header.hardMode} onChange={(value) => {setHeaderKey("hardMode", value)}} />
         {
            version >= 225 &&
            <>
               <span>Ore 1</span>
               <OptionbarInputSelect value={header.savedOreTierCopper} options={[["Not yet set", -1], ["Copper ore", 7], ["Tin ore", 166]]} onChange={(value) => {setHeaderKey("savedOreTierCopper", value)}}/>
               <span>Ore 2</span>
               <OptionbarInputSelect value={header.savedOreTierIron} options={[["Not yet set", -1], ["Iron ore", 6], ["Lead ore", 167]]} onChange={(value) => {setHeaderKey("savedOreTierIron", value)}}/>
               <span>Ore 3</span>
               <OptionbarInputSelect value={header.savedOreTierSilver} options={[["Not yet set", -1], ["Silver ore", 9], ["Tungsten ore", 168]]} onChange={(value) => {setHeaderKey("savedOreTierSilver", value)}}/>
               <span>Ore 4</span>
               <OptionbarInputSelect value={header.savedOreTierGold} options={[["Not yet set", -1], ["Gold ore", 8], ["Platinum ore", 169]]} onChange={(value) => {setHeaderKey("savedOreTierGold", value)}}/>
            </>
         }
         <span>Hardmode ore 1</span>
         <OptionbarInputSelect value={header.oreTier1} options={[["Not yet set", -1], ["Cobalt ore", 107], ["Palladium ore", 221]]} onChange={(value) => {setHeaderKey("oreTier1", value)}}/>
         <span>Hardmode ore 2</span>
         <OptionbarInputSelect value={header.oreTier2} options={[["Not yet set", -1], ["Mythril ore", 108], ["Orichalcum ore", 222]]} onChange={(value) => {setHeaderKey("oreTier2", value)}}/>
         <span>Hardmode ore 3</span>
         <OptionbarInputSelect value={header.oreTier3} options={[["Not yet set", -1], ["Adamantite ore", 111], ["Titanium ore", 223]]} onChange={(value) => {setHeaderKey("oreTier3", value)}}/>
         <span>Shadow orb already smashed</span>
         <OptionbarInputCheckbox value={header.shadowOrbSmashed} onChange={(value) => {setHeaderKey("shadowOrbSmashed", value)}} />
         <span>Shadow orbs smashed</span>
         <div className="sidebar-view-general-row-spanner">
            <OptionbarInputSlider value={header.shadowOrbCount} onChange={(value) => {setHeaderKey("shadowOrbCount", value)}} min={0} max={3} input inputWidth="3ch"/>
            <span>/ 3</span>
         </div>
         <span>Altars smashed</span>
         <OptionbarInput value={header.altarCount} onChange={(value) => {setHeaderKey("altarCount", value)}} int min={0} max={2147483647} width="12ch"/>
         <span>Active angler quest</span>
         <OptionbarInputSelect value={header.anglerQuest} options={[
                  ["Batfish", 0],
                  ["Bumblebee Tuna", 1],
                  ["Catfish", 2],
                  ["Cloudfish", 3],
                  ["Cursedfish", 4],
                  ["Dirtfish", 5],
                  ["Dynamite Fish", 6],
                  ["Eater of Plankton", 7],
                  ["Fallen Starfish", 8],
                  ["The Fish of Cthulhu", 9],
                  ["Fishotron", 10],
                  ["Harpyfish", 11],
                  ["Hungerfish", 12],
                  ["Ichorfish", 13],
                  ["Jewelfish", 14],
                  ["Mirage Fish", 15],
                  ["Mutant Flinxfin", 16],
                  ["Pengfish", 17],
                  ["Pixiefish", 18],
                  ["Spiderfish", 19],
                  ["Tundra Trout", 20],
                  ["Unicorn Fish", 21],
                  ["Guide Voodoo Fish", 22],
                  ["Wyverntail", 23],
                  ["Zombie Fish", 24],
                  ["Amanitia Fungifin", 25],
                  ["Angelfish", 26],
                  ["Bloody Manowar", 27],
                  ["Bonefish", 28],
                  ["Bunnyfish", 29],
                  ["Cap'n Tunabeard", 30],
                  ["Clownfish", 31],
                  ["Demonic Hellfish", 32],
                  ["Derpfish", 33],
                  ["Fishron", 34],
                  ["Infected Scabbardfish", 35],
                  ["Mudfish", 36],
                  ["Slimefish", 37],
                  ["Tropical Barracuda", 38],
                  ["Scarab Fish", 39],
                  ["Scorpio Fish", 40]
               ]} onChange={(value) => {setHeaderKey("anglerQuest", value)}}/>
         <span>Sundial used</span>
         <OptionbarInputCheckbox value={header.fastForwardTime} onChange={(value) => {setHeaderKey("fastForwardTime", value)}} />
         <span>Sundial cooldown</span>
         <OptionbarInputSlider value={header.sundialCooldown} onChange={(value) => {setHeaderKey("sundialCooldown", value)}} min={0} max={128} input inputWidth="5ch"/>
         {
            version >= 225 &&
            <>
               <span>Combat book used</span>
               <OptionbarInputCheckbox value={header.combatBookWasUsed} onChange={(value) => {setHeaderKey("combatBookWasUsed", value)}} />
            </>
         }

         <div className="sidebar-view-general-row-divider"><span>Weather:</span></div>

         <span>Day</span>
         <OptionbarInputCheckbox value={header.tempDayTime} onChange={(value) => {setHeaderKey("tempDayTime", value)}} />
         <span>Current time</span>
         <div className="sidebar-view-general-row-spanner">
            {header.tempDayTime ? "sunrise" : "sunset"}
            <OptionbarInputSlider value={header.tempTime} onChange={(value) => {setHeaderKey("tempTime", value)}} min={0} max={54000}/>
            {header.tempDayTime ? "sunset" : "sunrise"}
         </div>
         <span>Moon type</span>
         <OptionbarInputSelect value={header.moonType} options={[
               ["Grey", 0],
               ["Brown", 1],
               ["Ringed", 2],
               ["Blue marble", 3],
               ["White ice", 4],
               ["Green gas", 5],
               ["Pink candy", 6],
               ["Orange Venus", 7],
               ["Triple purple", 8]
            ]} onChange={(value) => {setHeaderKey("moonType", value)}}/>
         <span>Moon phase</span>
         <OptionbarInputSelect value={header.tempMoonPhase} options={[["Full moon", 0], ["Waning gibbous", 1], ["Third quarter", 2], ["Waning crescent", 3], ["New moon", 4], ["Waxing crescent", 5], ["First quarter", 6], ["Waxing gibbous", 7]]} onChange={(value) => {setHeaderKey("tempMoonPhase", value)}}/>
         <span>Raining</span>
         <OptionbarInputCheckbox value={header.tempRaining} onChange={(value) => {setHeaderKey("tempRaining", value)}} />
         <span>Rain time</span>
         <OptionbarInputSlider value={header.tempRainTime} onChange={(value) => {setHeaderKey("tempRainTime", value)}} min={0} max={147600} input inputWidth="8ch"/>
         <span>Max rain</span>
         <OptionbarInputSlider value={header.tempMaxRain} onChange={(value) => {setHeaderKey("tempMaxRain", value)}} float roundTo={1} min={0} max={0.9} input inputWidth="4ch"/>
         <span>Cloud background active</span>
         <OptionbarInput value={header.cloudBGActive} onChange={(value) => {/*
            //text6 = (((double)maxRaining > 0.6) ? Language.GetTextValue("GameUI.HeavyRain") : (((double)maxRaining >= 0.2) ? Language.GetTextValue("GameUI.Rain") : ((maxRaining > 0f) ? Language.GetTextValue("GameUI.LightRain") : ((cloudBGActive > 0f) ? Language.GetTextValue("GameUI.Overcast") : ((numClouds > 120) ? Language.GetTextValue("GameUI.MostlyCloudy") : ((numClouds > 80) ? Language.GetTextValue("GameUI.Cloudy") : ((numClouds <= 20) ? Language.GetTextValue("GameUI.Clear") : Language.GetTextValue("GameUI.PartlyCloudy"))))))));
            header. = value
         */}} />
         <span>Clouds count</span>
         <OptionbarInputSlider value={header.numClouds} onChange={(value) => {setHeaderKey("numClouds", value)}} min={0} max={200} input inputWidth="5ch"/>
         <span>Wind speed</span>
         <OptionbarInputSlider value={header.windSpeed} onChange={(value) => {setHeaderKey("windSpeed", value)}} float min={-1} max={1} input inputWidth="6ch"/>
         <span>Sandstorm</span>
         <OptionbarInputCheckbox value={header.Temp_Sandstorm_Happening} onChange={(value) => {setHeaderKey("Temp_Sandstorm_Happening", value)}} />
         <span>Sandstorm time left</span>
         <OptionbarInput value={header.Temp_Sandstorm_TimeLeft} onChange={(value) => {/*header. = value*/}} />
         <span>Sandstorm severity</span>
         <OptionbarInput value={header.Temp_Sandstorm_Severity} onChange={(value) => {/*header. = value*/}} />
         <span>Sandstorm intended severity</span>
         <OptionbarInput value={header.Temp_Sandstorm_IntendedSeverity} onChange={(value) => {/*header. = value*/}} />

         <div className="sidebar-view-general-row-divider"><span>Styles:</span></div>

         <span>Tree styles X 1</span>
         <OptionbarInputSlider value={header.treeX[0]} onChange={(value) => {setHeaderKey("treeX", value, 0)}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <span>Tree styles X 2</span>
         <OptionbarInputSlider value={header.treeX[1]} onChange={(value) => {setHeaderKey("treeX", value, 1)}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <span>Tree styles X 3</span>
         <OptionbarInputSlider value={header.treeX[2]} onChange={(value) => {setHeaderKey("treeX", value, 2)}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <span>Tree style</span>
         <div className="sidebar-view-general-row-spanner">
            <OptionbarInputSelect value={header.treeStyle[0]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5]} onChange={(value) => {setHeaderKey("treeStyle", value, 0)}}/>
            <OptionbarInputSelect value={header.treeStyle[1]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5]} onChange={(value) => {setHeaderKey("treeStyle", value, 1)}}/>
            <OptionbarInputSelect value={header.treeStyle[2]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5]} onChange={(value) => {setHeaderKey("treeStyle", value, 2)}}/>
            <OptionbarInputSelect value={header.treeStyle[3]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5]} onChange={(value) => {setHeaderKey("treeStyle", value, 3)}}/>
         </div>
         <span>{version >= 225 ? "Forest 1 background" : "Forest background"}</span>
         <OptionbarInputSelect value={header.setBG0} options={version >= 225 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 31, 51, 71, 72, 73] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 31, 51, 71, 72, 73]} onChange={(value) => {setHeaderKey("setBG0", value)}} width="6ch"/>
         {
            version >= 225 &&
            <>
               <span>Forest 2 background</span>
               <OptionbarInputSelect value={header.setBG10} options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 31, 51, 71, 72, 73]} onChange={(value) => {setHeaderKey("setBG0", value)}} width="6ch"/>
               <span>Forest 3 background</span>
               <OptionbarInputSelect value={header.setBG11} options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 31, 51, 71, 72, 73]} onChange={(value) => {setHeaderKey("setBG0", value)}} width="6ch"/>
               <span>Forest 4 background</span>
               <OptionbarInputSelect value={header.setBG12} options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 31, 51, 71, 72, 73]} onChange={(value) => {setHeaderKey("setBG0", value)}} width="6ch"/>
            </>
         }
         <span>Corruption background</span>
         <OptionbarInputSelect value={header.setBG1} options={version >= 225 ? [0, 1, 2, 3, 4] : [0, 1]} onChange={(value) => {setHeaderKey("setBG1", value)}} width="6ch"/>
         <span>Jungle background</span>
         <OptionbarInputSelect value={header.setBG2} options={version >= 225 ? [0, 1, 2, 3, 4, 5] : [0, 1]} onChange={(value) => {setHeaderKey("setBG2", value)}} width="6ch"/>
         <span>Deep jungle background</span>
         <OptionbarInputSelect value={header.jungleBackStyle} options={[0, 1]} onChange={(value) => {setHeaderKey("jungleBackStyle", value)}} width="6ch"/>
         <span>Snow background</span>
         <OptionbarInputSelect value={header.setBG3} options={version >= 225 ? [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 31, 32, 41, 42] : [0, 1, 2, 3, 4, 21, 22, 31, 32, 41, 42]} onChange={(value) => {setHeaderKey("setBG3", value)}} width="6ch"/>
         <span>Deep snow background</span>
         <OptionbarInputSelect value={header.iceBackStyle} options={[0, 1, 2, 3]} onChange={(value) => {setHeaderKey("iceBackStyle", value)}} width="6ch"/>
         <span>Hallow background</span>
         <OptionbarInputSelect value={header.setBG4} options={version >= 225 ? [0, 1, 2, 3, 4] : [0, 1]} onChange={(value) => {setHeaderKey("setBG4", value)}} width="6ch"/>
         <span>Crimson background</span>
         <OptionbarInputSelect value={header.setBG5} options={version >= 225 ? [0, 1, 2, 3, 4, 5] : [0, 1, 2]} onChange={(value) => {setHeaderKey("setBG5", value)}} width="6ch"/>
         <span>Desert background</span>
         <OptionbarInputSelect value={header.setBG6} options={version >= 225 ? [0, 1, 2, 3, 4] : [0, 1]} onChange={(value) => {setHeaderKey("setBG6", value)}} width="6ch"/>
         <span>Ocean background</span>
         <OptionbarInputSelect value={header.setBG7} options={version >= 225 ? [0, 1, 2, 3, 4, 5] : [0, 1, 2]} onChange={(value) => {setHeaderKey("setBG7", value)}} width="6ch"/>
         {
            version >= 225 &&
            <>
               <span>Mushroom background</span>
               <OptionbarInputSelect value={header.setBG8} options={[0, 1, 2, 3]} onChange={(value) => {setHeaderKey("setBG8", value)}} width="6ch"/>
            </>
         }
         <span>Underground backgrounds X 1</span>
         <OptionbarInputSlider value={header.caveBackX[0]} onChange={(value) => {setHeaderKey("caveBackX", value, 0)}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <span>Underground backgrounds X 2</span>
         <OptionbarInputSlider value={header.caveBackX[1]} onChange={(value) => {setHeaderKey("caveBackX", value, 1)}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <span>Underground backgrounds X 3</span>
         <OptionbarInputSlider value={header.caveBackX[2]} onChange={(value) => {setHeaderKey("caveBackX", value, 2)}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <span>Underground background</span>
         <div className="sidebar-view-general-row-spanner">
            <OptionbarInputSelect value={header.caveBackStyle[0]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5, 6, 7]} onChange={(value) => {setHeaderKey("caveBackStyle", value, 0)}}/>
            <OptionbarInputSelect value={header.caveBackStyle[1]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5, 6, 7]} onChange={(value) => {setHeaderKey("caveBackStyle", value, 1)}}/>
            <OptionbarInputSelect value={header.caveBackStyle[2]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5, 6, 7]} onChange={(value) => {setHeaderKey("caveBackStyle", value, 2)}}/>
            <OptionbarInputSelect value={header.caveBackStyle[3]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5, 6, 7]} onChange={(value) => {setHeaderKey("caveBackStyle", value, 3)}}/>
         </div>
         {
            version >= 225 &&
            <>
               <span>Underworld background</span>
               <OptionbarInputSelect value={header.setBG9} options={[0, 1, 2]} onChange={(value) => {setHeaderKey("setBG9", value)}} width="6ch"/>
            </>
         }
         <span>Underworld walls background</span>
         <OptionbarInputSelect value={header.hellBackStyle} options={[0, 1, 2]} onChange={(value) => {setHeaderKey("hellBackStyle", value)}} width="6ch"/>

         {
            version >= 225 &&
            <>
               <div className="sidebar-view-general-row-divider"><span>{"Pets <3"}</span></div>

               <span>Bought cat</span>
               <OptionbarInputCheckbox value={header.boughtCat} onChange={(value) => {setHeaderKey("boughtCat", value)}} />
               <span>Bought dog</span>
               <OptionbarInputCheckbox value={header.boughtDog} onChange={(value) => {setHeaderKey("boughtDog", value)}} />
               <span>Bought bunny</span>
               <OptionbarInputCheckbox value={header.boughtBunny} onChange={(value) => {setHeaderKey("boughtBunny", value)}} />
            </>
         }

         <div className="sidebar-view-general-row-divider"><span>NPCs saved:</span></div>

         <span>Goblin</span>
         <OptionbarInputCheckbox value={header.savedGoblin} onChange={(value) => {setHeaderKey("savedGoblin", value)}} />
         <span>Wizard</span>
         <OptionbarInputCheckbox value={header.savedWizard} onChange={(value) => {setHeaderKey("savedWizard", value)}} />
         <span>Mechanic</span>
         <OptionbarInputCheckbox value={header.savedMech} onChange={(value) => {setHeaderKey("savedMech", value)}} />
         <span>Angler</span>
         <OptionbarInputCheckbox value={header.savedAngler} onChange={(value) => {setHeaderKey("savedAngler", value)}} />
         <span>Stylist</span>
         <OptionbarInputCheckbox value={header.savedStylist} onChange={(value) => {setHeaderKey("savedStylist", value)}} />
         <span>Tax Collector</span>
         <OptionbarInputCheckbox value={header.savedTaxCollector} onChange={(value) => {setHeaderKey("savedTaxCollector", value)}} />
         {
            version >= 225 &&
            <>
               <span>Golfer</span>
               <OptionbarInputCheckbox value={header.savedGolfer} onChange={(value) => {setHeaderKey("savedGolfer", value)}} />
            </>
         }
         <span>Tavern Keep</span>
         <OptionbarInputCheckbox value={header.savedBartender} onChange={(value) => {setHeaderKey("savedBartender", value)}} />

         <div className="sidebar-view-general-row-divider"><span>Bosses downed:</span></div>

         <span>King Slime</span>
         <OptionbarInputCheckbox value={header.downedSlimeKing} onChange={(value) => {setHeaderKey("downedSlimeKing", value)}} />
         <span>Eye of Cthulu</span>
         <OptionbarInputCheckbox value={header.downedBoss1} onChange={(value) => {setHeaderKey("downedBoss1", value)}} />
         <span>Eater of Worlds</span>
         <OptionbarInputCheckbox value={header.downedBoss2} onChange={(value) => {setHeaderKey("downedBoss2", value)}} />
         <span>Skeletron</span>
         <OptionbarInputCheckbox value={header.downedBoss3} onChange={(value) => {setHeaderKey("downedBoss3", value)}} />
         <span>Queen Bee</span>
         <OptionbarInputCheckbox value={header.downedQueenBee} onChange={(value) => {setHeaderKey("downedQueenBee", value)}} />
         {
            version >= 225 &&
            <>
               <span>Queen Slime</span>
               <OptionbarInputCheckbox value={header.downedQueenSlime} onChange={(value) => {setHeaderKey("downedQueenSlime", value)}} />
            </>
         }
         <span>Any mechanical boss</span>
         <OptionbarInputCheckbox value={header.downedMechBossAny} onChange={(value) => {setHeaderKey("downedMechBossAny", value)}} />
         <span>The Destroyer</span>
         <OptionbarInputCheckbox value={header.downedMechBoss1} onChange={(value) => {setHeaderKey("downedMechBoss1", value)}} />
         <span>Skeletron Prime</span>
         <OptionbarInputCheckbox value={header.downedMechBoss2} onChange={(value) => {setHeaderKey("downedMechBoss2", value)}} />
         <span>The Twins</span>
         <OptionbarInputCheckbox value={header.downedMechBoss3} onChange={(value) => {setHeaderKey("downedMechBoss3", value)}} />
         <span>Plantera</span>
         <OptionbarInputCheckbox value={header.downedPlantBoss} onChange={(value) => {setHeaderKey("downedPlantBoss", value)}} />
         {
            version >= 225 &&
            <>
               <span>Empress of Light</span>
               <OptionbarInputCheckbox value={header.downedEmpressOfLight} onChange={(value) => {setHeaderKey("downedEmpressOfLight", value)}} />
            </>
         }
         <span>Golem</span>
         <OptionbarInputCheckbox value={header.downedGolemBoss} onChange={(value) => {setHeaderKey("downedGolemBoss", value)}} />
         <span>Fishron</span>
         <OptionbarInputCheckbox value={header.downedFishron} onChange={(value) => {setHeaderKey("downedFishron", value)}} />
         <span>Lunatic Cultists</span>
         <OptionbarInputCheckbox value={header.downedAncientCultist} onChange={(value) => {setHeaderKey("downedAncientCultist", value)}} />
         <span>Moon Lord</span>
         <OptionbarInputCheckbox value={header.downedMoonlord} onChange={(value) => {setHeaderKey("downedMoonlord", value)}} />

         <div className="sidebar-view-general-row-divider"><span>Invasion bosses downed:</span></div>

         <span>Clown</span>
         <OptionbarInputCheckbox value={header.downedClown} onChange={(value) => {setHeaderKey("downedClown", value)}} />
         <span>Mourning Wood</span>
         <OptionbarInputCheckbox value={header.downedHalloweenTree} onChange={(value) => {setHeaderKey("downedHalloweenTree", value)}} />
         <span>Pumpking</span>
         <OptionbarInputCheckbox value={header.downedHalloweenKing} onChange={(value) => {setHeaderKey("downedHalloweenKing", value)}} />
         <span>Ice Queen</span>
         <OptionbarInputCheckbox value={header.downedChristmasIceQueen} onChange={(value) => {setHeaderKey("downedChristmasIceQueen", value)}} />
         <span>Santa-NK1</span>
         <OptionbarInputCheckbox value={header.downedChristmasSantank} onChange={(value) => {setHeaderKey("downedChristmasSantank", value)}} />
         <span>EverScream</span>
         <OptionbarInputCheckbox value={header.downedChristmasTree} onChange={(value) => {setHeaderKey("downedChristmasTree", value)}} />
         <span>Solar Pillar</span>
         <OptionbarInputCheckbox value={header.downedTowerSolar} onChange={(value) => {setHeaderKey("downedTowerSolar", value)}} />
         <span>Vortex Pillar</span>
         <OptionbarInputCheckbox value={header.downedTowerVortex} onChange={(value) => {setHeaderKey("downedTowerVortex", value)}} />
         <span>Nebula Pillar</span>
         <OptionbarInputCheckbox value={header.downedTowerNebula} onChange={(value) => {setHeaderKey("downedTowerNebula", value)}} />
         <span>Stardust Pillar</span>
         <OptionbarInputCheckbox value={header.downedTowerStardust} onChange={(value) => {setHeaderKey("downedTowerStardust", value)}} />

         <div className="sidebar-view-general-row-divider"><span>Invasions downed:</span></div>

         <span>Goblin army</span>
         <OptionbarInputCheckbox value={header.downedGoblins} onChange={(value) => {setHeaderKey("downedGoblins", value)}} />
         <span>Pirate Invasion</span>
         <OptionbarInputCheckbox value={header.downedPirates} onChange={(value) => {setHeaderKey("downedPirates", value)}} />
         <span>Frost Legion</span>
         <OptionbarInputCheckbox value={header.downedFrost} onChange={(value) => {setHeaderKey("downedFrost", value)}} />
         <span>Martian Madness</span>
         <OptionbarInputCheckbox value={header.downedMartians} onChange={(value) => {setHeaderKey("downedMartians", value)}} />
      </div>
   );
}

export default connect(
   state => {
      return {
         worldObject: state.canvas.worldObject,
         unsafeOnlyTiles: state.canvas.unsafeOnlyTiles
      };
   },
   { stateChange }
)(SidebarCategoryGeneral);
