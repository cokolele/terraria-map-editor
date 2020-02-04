import React, { useState } from "react";
import { connect } from "react-redux";

import OptionbarInput from "/components/optionbar/input.jsx";
import OptionbarInputSlider from "/components/optionbar/input-slider.jsx";
import OptionbarInputSelect from "/components/optionbar/input-select.jsx";
import OptionbarInputCheckbox from "/components/optionbar/input-checkbox.jsx";
import "/components/styles/sidebar/categories/general.css";

import { setLayerImageRectangleColor } from "/app/canvas/main.js";

function SidebarCategoryGeneral({ worldObject }) {
   const { fileFormatHeader } = worldObject;

   const [header, setHeader] = useState(worldObject.header);

   const [invasionSizeStart, _setInvasionSizeStart] = useState(header.invasionSizeStart);
   const setInvasionSizeStart = (value) => {
      header.invasionSizeStart = value;
      if (value > header.invasionSize)
         header.invasionSize = value;
      _setInvasionSizeStart(value);
   };

   const [worldSurface, _setWorldSurface] = useState(header.worldSurface);
   const [rockLayer, _setRockLayer] = useState(header.rockLayer);
   const setWorldSurface = (value) => {
      header.worldSurface = value;
      _setWorldSurface(value);
      if (value >= rockLayer) {
         _setRockLayer(value);
         header.rockLayer = value;
      }
   };
   const setRockLayer = (value) => {
      _setRockLayer(value);
      header.rockLayer = value;
      if (value <= worldSurface) {
         console.log(value);
         _setWorldSurface(value);
         header.worldSurface = value;
      }
   };

   return (
      <div className="sidebar-view-general">
         <div className="sidebar-view-general-row-label">World name</div>
         <OptionbarInput value={header.mapName} onChange={(value) => {header.mapName = value}} />
         <div className="sidebar-view-general-row-label">World ID</div>
         <div className="sidebar-view-general-row-value">{header.worldId}</div>
         <div className="sidebar-view-general-row-label">Seed</div>
         <div className="sidebar-view-general-row-value">{header.seedText}</div>
         <div className="sidebar-view-general-row-label">Revision</div>
         <div className="sidebar-view-general-row-value">{fileFormatHeader.revision}</div>
         <div className="sidebar-view-general-row-label">World size in block</div>
         <div className="sidebar-view-general-row-value">{`${header.maxTilesX} x ${header.maxTilesY}`}</div>
         <div className="sidebar-view-general-row-label">World size in pixels</div>
         <div className="sidebar-view-general-row-value">{`${header.rightWorld} x ${header.bottomWorld}`}</div>
         <div className="sidebar-view-general-row-label">Spawn point</div>
         <div className="sidebar-view-general-row-spanner">
            x:
            <OptionbarInput value={header.spawnTileX} onChange={(value) => {header.spawnTileX = value}} int min={0} max={header.maxTilesX}/>
            y:
            <OptionbarInput value={header.spawnTileY} onChange={(value) => {header.spawnTileY = value}} int min={0} max={header.maxTilesY}/>
         </div>
         <div className="sidebar-view-general-row-label">Dungeon point</div>
         <div className="sidebar-view-general-row-spanner">
            x:
            <OptionbarInput value={header.dungeonX} onChange={(value) => {header.dungeonX = value}} int min={0} max={header.maxTilesX}/>
            y:
            <OptionbarInput value={header.dungeonY} onChange={(value) => {header.dungeonY = value}} int min={0} max={header.maxTilesY}/>
         </div>
         <div className="sidebar-view-general-row-label">Cavern level</div>
         <OptionbarInputSlider value={worldSurface} onChange={setWorldSurface} min={0} max={header.maxTilesY} input inputWidth="6ch"/>
         <div className="sidebar-view-general-row-label">Underground level</div>
         <OptionbarInputSlider value={rockLayer} onChange={setRockLayer} min={0} max={header.maxTilesY} input inputWidth="6ch"/>

         <div className="sidebar-view-general-row-divider"><span>Styles:</span></div>

         <div className="sidebar-view-general-row-label">Tree styles X 1</div>
         <OptionbarInputSlider value={header.treeX[0]} onChange={(value) => {header.treeX[0] = value}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <div className="sidebar-view-general-row-label">Tree styles X 2</div>
         <OptionbarInputSlider value={header.treeX[1]} onChange={(value) => {header.treeX[1] = value}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <div className="sidebar-view-general-row-label">Tree styles X 3</div>
         <OptionbarInputSlider value={header.treeX[2]} onChange={(value) => {header.treeX[2] = value}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <div className="sidebar-view-general-row-label">Tree style</div>
         <div className="sidebar-view-general-row-spanner">
            <OptionbarInputSelect value={header.treeStyle[0]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5]} onChange={(value) => {header.treeStyle[0] = value}}/>
            <OptionbarInputSelect value={header.treeStyle[1]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5]} onChange={(value) => {header.treeStyle[1] = value}}/>
            <OptionbarInputSelect value={header.treeStyle[2]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5]} onChange={(value) => {header.treeStyle[2] = value}}/>
            <OptionbarInputSelect value={header.treeStyle[3]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5]} onChange={(value) => {header.treeStyle[3] = value}}/>
         </div>
         <div className="sidebar-view-general-row-label">Forest background</div>
         <OptionbarInputSelect value={header.setBG0} options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 31, 51, 71, 72, 73]} onChange={(value) => {header.setBG0 = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Corruption background</div>
         <OptionbarInputSelect value={header.setBG1} options={[0, 1]} onChange={(value) => {header.setBG1 = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Jungle background</div>
         <OptionbarInputSelect value={header.setBG2} options={[0, 1]} onChange={(value) => {header.setBG2 = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Deep jungle background</div>
         <OptionbarInputSelect value={header.jungleBackStyle} options={[0, 1]} onChange={(value) => {header.jungleBackStyle = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Snow background</div>
         <OptionbarInputSelect value={header.setBG3} options={[0, 1, 2, 3, 4, 21, 22, 31, 32, 41, 42]} onChange={(value) => {header.setBG3 = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Deep snow background</div>
         <OptionbarInputSelect value={header.iceBackStyle} options={[0, 1, 2, 3]} onChange={(value) => {header.iceBackStyle = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Hallow background</div>
         <OptionbarInputSelect value={header.setBG4} options={[0, 1]} onChange={(value) => {header.setBG4 = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Crimson background</div>
         <OptionbarInputSelect value={header.setBG5} options={[0, 1, 2]} onChange={(value) => {header.setBG5 = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Desert background</div>
         <OptionbarInputSelect value={header.setBG6} options={[0, 1]} onChange={(value) => {header.setBG6 = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Ocean background</div>
         <OptionbarInputSelect value={header.setBG7} options={[0, 1, 2]} onChange={(value) => {header.setBG7 = value}} width="5ch"/>
         <div className="sidebar-view-general-row-label">Underground backgrounds X 1</div>
         <OptionbarInputSlider value={header.caveBackX[0]} onChange={(value) => {header.caveBackX[0] = value}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <div className="sidebar-view-general-row-label">Underground backgrounds X 2</div>
         <OptionbarInputSlider value={header.caveBackX[1]} onChange={(value) => {header.caveBackX[1] = value}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <div className="sidebar-view-general-row-label">Underground backgrounds X 3</div>
         <OptionbarInputSlider value={header.caveBackX[2]} onChange={(value) => {header.caveBackX[2] = value}} min={0} max={header.maxTilesX} input inputWidth="6ch"/>
         <div className="sidebar-view-general-row-label">Underground background</div>
         <div className="sidebar-view-general-row-spanner">
            <OptionbarInputSelect value={header.caveBackStyle[0]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5, 6, 7]} onChange={(value) => {header.caveBackStyle[0] = value}}/>
            <OptionbarInputSelect value={header.caveBackStyle[1]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5, 6, 7]} onChange={(value) => {header.caveBackStyle[1] = value}}/>
            <OptionbarInputSelect value={header.caveBackStyle[2]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5, 6, 7]} onChange={(value) => {header.caveBackStyle[2] = value}}/>
            <OptionbarInputSelect value={header.caveBackStyle[3]} className="sidebar-view-general-input-select" options={[0, 1, 2, 3, 4, 5, 6, 7]} onChange={(value) => {header.caveBackStyle[3] = value}}/>
         </div>
         <div className="sidebar-view-general-row-label">Underworld background</div>
         <OptionbarInputSelect value={header.hellBackStyle} options={[0, 1, 2]} onChange={(value) => {header.hellBackStyle = value}} width="5ch"/>

         <div className="sidebar-view-general-row-divider"><span>Events:</span></div>

         <div className="sidebar-view-general-row-label">Blood moon</div>
         <OptionbarInputCheckbox value={header.tempBloodMoon} onChange={(value) => {header.tempBloodMoon = value; setHeader(header)}} />
         <div className="sidebar-view-general-row-label">Eclipse</div>
         <OptionbarInputCheckbox value={header.tempEclipse} onChange={(value) => {header.tempEclipse = value; setHeader({...header})}} />
         <div className="sidebar-view-general-row-label">Spawn meteor</div>
         <OptionbarInputCheckbox value={header.spawnMeteor} onChange={(value) => {header.spawnMeteor = value}} />
         <div className="sidebar-view-general-row-label">Invasion</div>
         <OptionbarInputSelect value={header.invasionType} options={[["None", 0], ["Goblin invasion", 1], ["Frost legion", 2], ["Pirate invasion", 3], ["Martian madness", 4]]} onChange={(value) => {header.invasionType = value}}/>
         <div className="sidebar-view-general-row-label">Invasion progress</div>
         <OptionbarInputSlider value={header.invasionSize} onChange={(value) => {header.invasionSize = value}} min={0} max={invasionSizeStart}/>
         <div className="sidebar-view-general-row-label">Invasion size</div>
         <OptionbarInputSlider value={invasionSizeStart} onChange={setInvasionSizeStart} min={0} max={10400} input inputWidth="7ch"/>
         <div className="sidebar-view-general-row-label">Slime rain time</div>
         <OptionbarInputSlider value={header.slimeRainTime} onChange={(value) => {header.slimeRainTime = value}} min={-604800} max={54000} input inputWidth="9ch"/>
         <div className="sidebar-view-general-row-label">Cultists cooldown</div>
         <OptionbarInputSlider value={header.tempCultistDelay} onChange={(value) => {header.tempCultistDelay = value}} min={0} max={86400} input inputWidth="7ch"/>

         <div className="sidebar-view-general-row-divider"><span>Flags:</span></div>

         <div className="sidebar-view-general-row-label">Expert mode</div>
         <OptionbarInputCheckbox value={header.expertMode} onChange={(value) => {header.expertMode = value}} />
         <div className="sidebar-view-general-row-label">Crimson world</div>
         <OptionbarInputCheckbox value={header.crimson} onChange={(value) => {header.crimson = value}} />
         <div className="sidebar-view-general-row-label">Hard mode</div>
         <OptionbarInputCheckbox value={header.hardMode} onChange={(value) => {header.hardMode = value}} />
         <div className="sidebar-view-general-row-label">Hardmode ore 1</div>
         <OptionbarInputSelect value={header.oreTier1} options={[["Not yet set", -1], ["Cobalt ore", 107], ["Palladium ore", 221]]} onChange={(value) => {header.oreTier1 = value}}/>
         <div className="sidebar-view-general-row-label">Hardmode ore 2</div>
         <OptionbarInputSelect value={header.oreTier2} options={[["Not yet set", -1], ["Mythril ore", 108], ["Orichalcum ore", 222]]} onChange={(value) => {header.oreTier2 = value}}/>
         <div className="sidebar-view-general-row-label">Hardmode ore 3</div>
         <OptionbarInputSelect value={header.oreTier3} options={[["Not yet set", -1], ["Adamantite ore", 111], ["Titanium ore", 223]]} onChange={(value) => {header.oreTier3 = value}}/>
         <div className="sidebar-view-general-row-label">Shadow orb already smashed</div>
         <OptionbarInputCheckbox value={header.shadowOrbSmashed} onChange={(value) => {header.shadowOrbSmashed = value}} />
         <div className="sidebar-view-general-row-label">Shadow orbs smashed</div>
         <div className="sidebar-view-general-row-spanner">
            <OptionbarInputSlider value={header.shadowOrbCount} onChange={(value) => {header.shadowOrbCount = value}} min={0} max={3} input inputWidth="3ch"/>
            <span>/ 3</span>
         </div>
         <div className="sidebar-view-general-row-label">Altars smashed</div>
         <OptionbarInput value={header.altarCount} onChange={(value) => {header.altarCount = value}} int min={0} max={2147483647} width="12ch"/>
         <div className="sidebar-view-general-row-label">Active angler quest</div>
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
                  ["Tropical Barracuda", 38]
               ]} onChange={(value) => {header.anglerQuest = value}}/>
         <div className="sidebar-view-general-row-label">Sundial used</div>
         <OptionbarInputCheckbox value={header.fastForwardTime} onChange={(value) => {header.fastForwardTime = value}} />
         <div className="sidebar-view-general-row-label">Sundial cooldown</div>
         <OptionbarInputSlider value={header.sundialCooldown} onChange={(value) => {header.sundialCooldown = value}} min={0} max={128} input inputWidth="5ch"/>

         <div className="sidebar-view-general-row-divider"><span>Weather:</span></div>

         <div className="sidebar-view-general-row-label">Day</div>
         <OptionbarInputCheckbox value={header.tempDayTime} onChange={(value) => {header.tempDayTime = value}} />
         <div className="sidebar-view-general-row-label">Current time</div>
         <OptionbarInputSlider value={header.tempTime} onChange={(value) => {header.tempTime = value}} min={0} max={54000} input inputWidth="7ch"/>
         <div className="sidebar-view-general-row-label">Moon type</div>
         <OptionbarInputSelect value={header.moonType} options={[["Grey", 0], ["Orange", 1], ["Ringed", 2]]} onChange={(value) => {header.moonType = value}}/>
         <div className="sidebar-view-general-row-label">Moon phase</div>
         <OptionbarInputSelect value={header.moonType} options={[["Full moon", 0], ["Waning gibbous", 1], ["Third quarter", 2], ["Waning crescent", 3], ["New moon", 4], ["Waxing crescent", 5], ["First quarter", 6], ["Waxing gibbous", 7]]} onChange={(value) => {header.moonType = value}}/>
         <div className="sidebar-view-general-row-label">Raining</div>
         <OptionbarInputCheckbox value={header.tempRaining} onChange={(value) => {header.tempRaining = value}} />
         <div className="sidebar-view-general-row-label">Rain time</div>
         <OptionbarInputSlider value={header.tempRainTime} onChange={(value) => {header.tempRainTime = value}} min={0} max={147600} input inputWidth="8ch"/>
         <div className="sidebar-view-general-row-label">Max rain</div>
         <OptionbarInputSlider value={header.tempMaxRain} onChange={(value) => {header.tempMaxRain = value}} float roundTo={1} min={0} max={0.9} input inputWidth="4ch"/>
         <div className="sidebar-view-general-row-label">Cloud background active</div>
         <OptionbarInput value={header.cloudBGActive} onChange={(value) => {/*
            //text6 = (((double)maxRaining > 0.6) ? Language.GetTextValue("GameUI.HeavyRain") : (((double)maxRaining >= 0.2) ? Language.GetTextValue("GameUI.Rain") : ((maxRaining > 0f) ? Language.GetTextValue("GameUI.LightRain") : ((cloudBGActive > 0f) ? Language.GetTextValue("GameUI.Overcast") : ((numClouds > 120) ? Language.GetTextValue("GameUI.MostlyCloudy") : ((numClouds > 80) ? Language.GetTextValue("GameUI.Cloudy") : ((numClouds <= 20) ? Language.GetTextValue("GameUI.Clear") : Language.GetTextValue("GameUI.PartlyCloudy"))))))));
            header. = value
         */}} />
         <div className="sidebar-view-general-row-label">Clouds count</div>
         <OptionbarInputSlider value={header.numClouds} onChange={(value) => {header.numClouds = value}} min={0} max={200} input inputWidth="5ch"/>
         <div className="sidebar-view-general-row-label">Wind speed</div>
         <OptionbarInputSlider value={header.windSpeed} onChange={(value) => {header.windSpeed = value}} float min={-1} max={1} input inputWidth="6ch"/>
         <div className="sidebar-view-general-row-label">Sandstorm</div>
         <OptionbarInputCheckbox value={header.Temp_Sandstorm_Happening} onChange={(value) => {header.Temp_Sandstorm_Happening = value}} />
         <div className="sidebar-view-general-row-label">Sandstorm time left</div>
         <OptionbarInput value={header.Temp_Sandstorm_TimeLeft} onChange={(value) => {/*header. = value*/}} />
         <div className="sidebar-view-general-row-label">Sandstorm severity</div>
         <OptionbarInput value={header.Temp_Sandstorm_Severity} onChange={(value) => {/*header. = value*/}} />
         <div className="sidebar-view-general-row-label">Sandstorm intended severity</div>
         <OptionbarInput value={header.Temp_Sandstorm_IntendedSeverity} onChange={(value) => {/*header. = value*/}} />

         <div className="sidebar-view-general-row-divider"><span>NPCs saved:</span></div>

         <div className="sidebar-view-general-row-label">Goblin</div>
         <OptionbarInputCheckbox value={header.savedGoblin} onChange={(value) => {header.savedGoblin = value}} />
         <div className="sidebar-view-general-row-label">Wizard</div>
         <OptionbarInputCheckbox value={header.savedWizard} onChange={(value) => {header.savedWizard = value}} />
         <div className="sidebar-view-general-row-label">Mechanic</div>
         <OptionbarInputCheckbox value={header.savedMech} onChange={(value) => {header.savedMech = value}} />
         <div className="sidebar-view-general-row-label">Angler</div>
         <OptionbarInputCheckbox value={header.savedAngler} onChange={(value) => {header.savedAngler = value}} />
         <div className="sidebar-view-general-row-label">Stylist</div>
         <OptionbarInputCheckbox value={header.savedStylist} onChange={(value) => {header.savedStylist = value}} />
         <div className="sidebar-view-general-row-label">Tax Collector</div>
         <OptionbarInputCheckbox value={header.savedTaxCollector} onChange={(value) => {header.savedTaxCollector = value}} />
         <div className="sidebar-view-general-row-label">Tavern Keep</div>
         <OptionbarInputCheckbox value={header.savedBartender} onChange={(value) => {header.savedBartender = value}} />

         <div className="sidebar-view-general-row-divider"><span>Bosses downed:</span></div>

         <div className="sidebar-view-general-row-label">King Slime</div>
         <OptionbarInputCheckbox value={header.downedSlimeKing} onChange={(value) => {header.downedSlimeKing = value}} />
         <div className="sidebar-view-general-row-label">Eye of Cthulu</div>
         <OptionbarInputCheckbox value={header.downedBoss1} onChange={(value) => {header.downedBoss1 = value}} />
         <div className="sidebar-view-general-row-label">Eater of Worlds</div>
         <OptionbarInputCheckbox value={header.downedBoss2} onChange={(value) => {header.downedBoss2 = value}} />
         <div className="sidebar-view-general-row-label">Skeletron</div>
         <OptionbarInputCheckbox value={header.downedBoss3} onChange={(value) => {header.downedBoss3 = value}} />
         <div className="sidebar-view-general-row-label">Queen Bee</div>
         <OptionbarInputCheckbox value={header.downedQueenBee} onChange={(value) => {header.downedQueenBee = value}} />
         <div className="sidebar-view-general-row-label">Any mechanical boss</div>
         <OptionbarInputCheckbox value={header.downedMechBossAny} onChange={(value) => {header.downedMechBossAny = value}} />
         <div className="sidebar-view-general-row-label">The Destroyer</div>
         <OptionbarInputCheckbox value={header.downedMechBoss1} onChange={(value) => {header.downedMechBoss1 = value}} />
         <div className="sidebar-view-general-row-label">Skeletron Prime</div>
         <OptionbarInputCheckbox value={header.downedMechBoss2} onChange={(value) => {header.downedMechBoss2 = value}} />
         <div className="sidebar-view-general-row-label">The Twins</div>
         <OptionbarInputCheckbox value={header.downedMechBoss3} onChange={(value) => {header.downedMechBoss3 = value}} />
         <div className="sidebar-view-general-row-label">Plantera</div>
         <OptionbarInputCheckbox value={header.downedPlantBoss} onChange={(value) => {header.downedPlantBoss = value}} />
         <div className="sidebar-view-general-row-label">Golem</div>
         <OptionbarInputCheckbox value={header.downedGolemBoss} onChange={(value) => {header.downedGolemBoss = value}} />
         <div className="sidebar-view-general-row-label">Fishron</div>
         <OptionbarInputCheckbox value={header.downedFishron} onChange={(value) => {header.downedFishron = value}} />
         <div className="sidebar-view-general-row-label">Lunatic Cultists</div>
         <OptionbarInputCheckbox value={header.downedAncientCultist} onChange={(value) => {header.downedAncientCultist = value}} />
         <div className="sidebar-view-general-row-label">Moon Lord</div>
         <OptionbarInputCheckbox value={header.downedMoonlord} onChange={(value) => {header.downedMoonlord = value}} />

         <div className="sidebar-view-general-row-divider"><span>Invasion bosses downed:</span></div>

         <div className="sidebar-view-general-row-label">Clown</div>
         <OptionbarInputCheckbox value={header.downedClown} onChange={(value) => {header.downedClown = value}} />
         <div className="sidebar-view-general-row-label">Mourning Wood</div>
         <OptionbarInputCheckbox value={header.downedHalloweenTree} onChange={(value) => {header.downedHalloweenTree = value}} />
         <div className="sidebar-view-general-row-label">Pumpking</div>
         <OptionbarInputCheckbox value={header.downedHalloweenKing} onChange={(value) => {header.downedHalloweenKing = value}} />
         <div className="sidebar-view-general-row-label">Ice Queen</div>
         <OptionbarInputCheckbox value={header.downedChristmasIceQueen} onChange={(value) => {header.downedChristmasIceQueen = value}} />
         <div className="sidebar-view-general-row-label">Santa-NK1</div>
         <OptionbarInputCheckbox value={header.downedChristmasSantank} onChange={(value) => {header.downedChristmasSantank = value}} />
         <div className="sidebar-view-general-row-label">EverScream</div>
         <OptionbarInputCheckbox value={header.downedChristmasTree} onChange={(value) => {header.downedChristmasTree = value}} />
         <div className="sidebar-view-general-row-label">Solar Pillar</div>
         <OptionbarInputCheckbox value={header.downedTowerSolar} onChange={(value) => {header.downedTowerSolar = value}} />
         <div className="sidebar-view-general-row-label">Vortex Pillar</div>
         <OptionbarInputCheckbox value={header.downedTowerVortex} onChange={(value) => {header.downedTowerVortex = value}} />
         <div className="sidebar-view-general-row-label">Nebula Pillar</div>
         <OptionbarInputCheckbox value={header.downedTowerNebula} onChange={(value) => {header.downedTowerNebula = value}} />
         <div className="sidebar-view-general-row-label">Stardust Pillar</div>
         <OptionbarInputCheckbox value={header.downedTowerStardust} onChange={(value) => {header.downedTowerStardust = value}} />

         <div className="sidebar-view-general-row-divider"><span>Invasions downed:</span></div>

         <div className="sidebar-view-general-row-label">Goblin army</div>
         <OptionbarInputCheckbox value={header.downedGoblins} onChange={(value) => {header.downedGoblins = value}} />
         <div className="sidebar-view-general-row-label">Pirate Invasion</div>
         <OptionbarInputCheckbox value={header.downedPirates} onChange={(value) => {header.downedPirates = value}} />
         <div className="sidebar-view-general-row-label">Frost Legion</div>
         <OptionbarInputCheckbox value={header.downedFrost} onChange={(value) => {header.downedFrost = value}} />
         <div className="sidebar-view-general-row-label">Martian Madness</div>
         <OptionbarInputCheckbox value={header.downedMartians} onChange={(value) => {header.downedMartians = value}} />
      </div>
   );
}

export default connect(state => {
   return {
      worldObject: state.app.worldObject,
   };
})(SidebarCategoryGeneral);
