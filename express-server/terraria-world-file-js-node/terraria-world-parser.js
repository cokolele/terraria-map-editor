const terrariaFileParser = require("./utils/terraria-file-parser.js");
const TerrariaWorldParserError = require("./utils/terraria-world-parser-error.js");

module.exports = class terrariaWorldParser extends terrariaFileParser {
    constructor(path) {
        try {
            super(path);
        } catch (e) {
            throw new TerrariaWorldParserError("Problem with loading the file", e);
        }

        this.world = {
            pointers:[0],
            importants:[],
            tiles: {
                x:null,
                y:null
            },
        }
    }

    parse(param1, param2) {
        const sections = ["fileformatheader", "header", "worldtiles", "chests", "signs", "npcs", "tileentities", "weightedpressureplates", "townmanager", "footer"];
        const dataFormat = {
            fileFormatHeader:       [sections[0], this.parseFileFormatHeader],
            header:                 [sections[1], this.parseHeader],
            worldTiles:             [sections[2], this.parseWorldTiles],
            chestsData:             [sections[3], this.parseChests],
            signsData:              [sections[4], this.parseSigns],
            NPCsData:               [sections[5], this.parseNPCs],
            tileEntities:           [sections[6], this.parseTileEntities],
            weightedPressurePlates: [sections[7], this.parseWeightedPressurePlates],
            townManager:            [sections[8], this.parseTownManager],
            footer:                 [sections[9], this.parseFooter]
        }

        if (typeof param1 == "object") {
            this.selectedSections = param1.map(section => section.toLowerCase());
            this.percentageCallback = param2;
        }
        else if (typeof param1 == "function") {
            this.selectedSections = sections;
            this.percentageCallback = param1;
        }
        else
            this.selectedSections = sections;

        let data = {};

        try {

            for (let [sectionLabel, [section, parseFunction]] of Object.entries(dataFormat)) {
                if (this.selectedSections.includes(section) || section == "fileformatheader" || section == "header") {

                    this.jumpTo(this.world.pointers[ sections.indexOf(section) ])

                    if (this.selectedSections.includes(section))
                        data[sectionLabel] = parseFunction.call(this);
                    else {
                        parseFunction.call(this, true);
                        this.offset = this.world.pointers[ sections.indexOf(section) + 1 ];
                    }

                    if (this.offset != this.world.pointers[ sections.indexOf(section) + 1 ] && this.offset != this.buffer.byteLength)
                        throw new Error(section + " section position did not end where it should");
                }
            }

        } catch(e) {
            throw new TerrariaWorldParserError("Problem with parsing the file", e);
        }

        return data;
    }

    parseFileFormatHeader() {
        let data = {};

        data.version        = this.readInt32();
        data.magicNumber    = this.readString(7);
        data.fileType       = this.readUInt8();
        data.revision       = this.readUInt32();
        this.skipBytes(7);
        data.favorite       = this.readBoolean();
        data.pointers       = [];
        data.importants     = [];

        const pointersCount = this.readInt16();
        for (let i = 1; i <= pointersCount; i++) {
            data.pointers[i] = this.readInt32();
        }

        const importantsStartOffset = this.offset;

        const importantsCount = this.readInt16();
        let num3 = 0;
        let num4 = 128;
        for (let i = 0; i < importantsCount; ++i) {
            if (num4 == 128) {
                num3 = this.readUInt8();
                num4 = 1;
            } else
                num4 = num4 << 1 ;

            if ((num3 & num4) == num4)
                data.importants[i] = true;
        }

        const importantsEndOffset = this.offset;
        this.offset = importantsStartOffset;
        data._importantsSectionData = this.readBytes( importantsEndOffset - importantsStartOffset );

        this.world.pointers = data.pointers;
        this.world.importants = data.importants;

        if ( data.version < 194 || data.magicNumber != "relogic" || data.fileType != 2)
            throw new Error("World file version is not supported (only 1.3.5.3) or corrupted metadata");

        return data;
    }

    parseHeader(onlyNeededData) {
        let data = {};

        data.mapName                = this.readString();
        data.seedText               = this.readString();
        data.worldGeneratorVersion  = this.readBytes(8);
        data.guid                   = this.readBytes(16);
        data.worldId                = this.readInt32();
        data.leftWorld              = this.readInt32();
        data.rightWorld             = this.readInt32();
        data.topWorld               = this.readInt32();
        data.bottomWorld            = this.readInt32();
        data.maxTilesY              = this.readInt32();
        data.maxTilesX              = this.readInt32();

        this.world.tiles.x = data.maxTilesX;
        this.world.tiles.y = data.maxTilesY;
        if (onlyNeededData)
            return;

        data.expertMode             = this.readBoolean();
        data.creationTime           = this.readBytes(8);
        data.moonType               = this.readUInt8();

        data.treeX = [];
        data.treeX[0]               = this.readInt32();
        data.treeX[1]               = this.readInt32();
        data.treeX[2]               = this.readInt32();

        data.treeStyle = [];
        data.treeStyle[0]           = this.readInt32();
        data.treeStyle[1]           = this.readInt32();
        data.treeStyle[2]           = this.readInt32();
        data.treeStyle[3]           = this.readInt32();

        data.caveBackX = [];
        data.caveBackX[0]           = this.readInt32();
        data.caveBackX[1]           = this.readInt32();
        data.caveBackX[2]           = this.readInt32();

        data.caveBackStyle = [];
        data.caveBackStyle[0]       = this.readInt32();
        data.caveBackStyle[1]       = this.readInt32();
        data.caveBackStyle[2]       = this.readInt32();
        data.caveBackStyle[3]       = this.readInt32();

        data.iceBackStyle           = this.readInt32();
        data.jungleBackStyle        = this.readInt32();
        data.hellBackStyle          = this.readInt32();
        data.spawnTileX             = this.readInt32();
        data.spawnTileY             = this.readInt32();
        data.worldSurface           = this.readFloat64();
        data.rockLayer              = this.readFloat64();
        data.tempTime               = this.readFloat64();
        data.tempDayTime            = this.readBoolean();
        data.tempMoonPhase          = this.readInt32();
        data.tempBloodMoon          = this.readBoolean();
        data.tempEclipse            = this.readBoolean();
        data.dungeonX               = this.readInt32();
        data.dungeonY               = this.readInt32();
        data.crimson                = this.readBoolean();
        data.downedBoss1            = this.readBoolean();
        data.downedBoss2            = this.readBoolean();
        data.downedBoss3            = this.readBoolean();
        data.downedQueenBee         = this.readBoolean();
        data.downedMechBoss1        = this.readBoolean();
        data.downedMechBoss2        = this.readBoolean();
        data.downedMechBoss3        = this.readBoolean();
        data.downedMechBossAny      = this.readBoolean();
        data.downedPlantBoss        = this.readBoolean();
        data.downedGolemBoss        = this.readBoolean();
        data.downedSlimeKing        = this.readBoolean();
        data.savedGoblin            = this.readBoolean();
        data.savedWizard            = this.readBoolean();
        data.savedMech              = this.readBoolean();
        data.downedGoblins          = this.readBoolean();
        data.downedClown            = this.readBoolean();
        data.downedFrost            = this.readBoolean();
        data.downedPirates          = this.readBoolean();
        data.shadowOrbSmashed       = this.readBoolean();
        data.spawnMeteor            = this.readBoolean();
        data.shadowOrbCount         = this.readUInt8();
        data.altarCount             = this.readInt32();
        data.hardMode               = this.readBoolean();
        data.invasionDelay          = this.readInt32();
        data.invasionSize           = this.readInt32();
        data.invasionType           = this.readInt32();
        data.invasionX              = this.readFloat64();
        data.slimeRainTime          = this.readFloat64();
        data.sundialCooldown        = this.readUInt8();
        data.tempRaining            = this.readBoolean();
        data.tempRainTime           = this.readInt32();
        data.tempMaxRain            = this.readFloat32();
        data.oreTier1               = this.readInt32();
        data.oreTier2               = this.readInt32();
        data.oreTier3               = this.readInt32();
        data.setBG0                 = this.readUInt8();
        data.setBG1                 = this.readUInt8();
        data.setBG2                 = this.readUInt8();
        data.setBG3                 = this.readUInt8();
        data.setBG4                 = this.readUInt8();
        data.setBG5                 = this.readUInt8();
        data.setBG6                 = this.readUInt8();
        data.setBG7                 = this.readUInt8();
        data.cloudBGActive          = this.readInt32();
        data.numClouds              = this.readInt16();
        data.windSpeed              = this.readFloat32();

        data.anglerWhoFinishedToday = [];
        for (let i = this.readInt32(); i > 0; --i) {
            data.anglerWhoFinishedToday.push(this.readString());
        }
        data.savedAngler            = this.readBoolean();
        data.anglerQuest            = this.readInt32();
        data.savedStylist           = this.readBoolean();
        data.savedTaxCollector      = this.readBoolean();
        data.invasionSizeStart      = this.readInt32();
        data.tempCultistDelay       = this.readInt32();

        data.killCount = [];
        const num1 = this.readInt16();
        for (let i = 0; i < num1; ++i) {
            if (i < 580)
                data.killCount[i] = this.readInt32();
            else
                this.skipBytes(4);
        }

        data.fastForwardTime        = this.readBoolean();
        data.downedFishron          = this.readBoolean();
        data.downedMartians         = this.readBoolean();
        data.downedAncientCultist   = this.readBoolean();
        data.downedMoonlord         = this.readBoolean();
        data.downedHalloweenKing    = this.readBoolean();
        data.downedHalloweenTree    = this.readBoolean();
        data.downedChristmasIceQueen = this.readBoolean();
        data.downedChristmasSantank = this.readBoolean();
        data.downedChristmasTree    = this.readBoolean();
        data.downedTowerSolar       = this.readBoolean();
        data.downedTowerVortex      = this.readBoolean();
        data.downedTowerNebula      = this.readBoolean();
        data.downedTowerStardust    = this.readBoolean();
        data.TowerActiveSolar       = this.readBoolean();
        data.TowerActiveVortex      = this.readBoolean();
        data.TowerActiveNebula      = this.readBoolean();
        data.TowerActiveStardust    = this.readBoolean();
        data.LunarApocalypseIsUp    = this.readBoolean();
        data.tempPartyManual        = this.readBoolean();
        data.tempPartyGenuine       = this.readBoolean();
        data.tempPartyCooldown      = this.readInt32();

        data.tempPartyCelebratingNPCs = [];
        const num2 = this.readInt32();
        for (let i = 0; i < num2; ++i) {
            data.tempPartyCelebratingNPCs.push(this.readInt32());
        }

        data.Temp_Sandstorm_Happening       = this.readBoolean();
        data.Temp_Sandstorm_TimeLeft        = this.readInt32();
        data.Temp_Sandstorm_Severity        = this.readFloat32();
        data.Temp_Sandstorm_IntendedSeverity = this.readFloat32();
        data.savedBartender                 = this.readBoolean();
        data.DD2Event_DownedInvasionT1      = this.readBoolean();
        data.DD2Event_DownedInvasionT2      = this.readBoolean();
        data.DD2Event_DownedInvasionT3      = this.readBoolean();

        return data;
    }

    parseWorldTiles() {
        let data;

        data = new Array(this.world.tiles.x);
        for (let x = 0; x < this.world.tiles.x; x++) {
            data[x] = new Array(this.world.tiles.y);
            for (let y = 0; y < this.world.tiles.y; y++) {
                const tile = this.parseTileData();
                data[x][y] = tile;
                let RLE = tile.RLE;
                delete tile.RLE;

                while(RLE > 0) {
                    y++;
                    RLE--;
                    data[x][y] = tile;
                }
            }
        }

        return data;
    }

    parseTileData() {
        let tile = {};

        const flags1 = this.readUInt8();
        let flags2, flags3;

        // flags2 present
        if (flags1 & 1) {
            flags2 = this.readUInt8();

        // flags3 present
            if (flags2 & 1)
                flags3 = this.readUInt8();
        }

        // contains block
        if (flags1 & 2) {
            // block id has 1 byte / 2 bytes
            if (flags1 & 32)
                tile.blockId = this.readUInt16();
            else
                tile.blockId = this.readUInt8();

            // important tile (animated, big sprite, more variants...)
            if (this.world.importants[tile.blockId]) {
                tile.frameX = this.readInt16();
                tile.frameY = tile.blockId == 144 ? 0 : this.readInt16();
            }

            // painted block
            if (flags3 & 8) {
                if (!tile.colors) tile.colors = {};
                tile.colors.block = this.readUInt8();
            }
        }

        // contains wall
        if (flags1 & 4) {
            tile.wallId = this.readUInt8();

            // painted wall
            if (flags3 & 16) {
                if (!tile.colors) tile.colors = {};
                tile.colors.wall = this.readUInt8();
            }
        }

        // liquid informations
        const liquidType = (flags1 & 24) >> 3;
        if (liquidType != 0) {
            if (!tile.liquid) tile.liquid = {};
            tile.liquid.amount = this.readUInt8();
            switch (liquidType) {
                case 1: tile.liquid.type = "water"; break;
                case 2: tile.liquid.type = "lava"; break;
                case 3: tile.liquid.type = "honey"; break;
            }
        }

        // flags2 has any other informations than flags3 presence
        if (flags2 > 1) {
            if (!tile.wiring)
                tile.wiring = {};
            if (!tile.wiring.wires)
                tile.wiring.wires = {};
            if (flags2 & 2)
                tile.wiring.wires.red = true;
            if (flags2 & 4)
                tile.wiring.wires.blue = true;
            if (flags2 & 8)
                tile.wiring.wires.green = true;

            const slope = (flags2 & 112) >> 4;
            if (slope != 0)
                switch(slope) {
                    case 1: tile.slope = "half"; break;
                    case 2: tile.slope = "TR"; break;
                    case 3: tile.slope = "TL"; break;
                    case 4: tile.slope = "BR"; break;
                    case 5: tile.slope = "BL"; break;
                }
        }

        // flags3 has any informations
        if (flags3 > 0) {
            if (!tile.wiring)
                tile.wiring = {};
            if (flags3 & 2)
                tile.wiring.actuator = true;
            if (flags3 & 4)
                tile.wiring.actuated = true;
            if (flags3 & 32) {
                if (!tile.wiring.wires)
                    tile.wiring.wires = {};
                tile.wiring.wires.yellow = true;
            }
        }

        switch ((flags1 & 192) >> 6) {
            case 0: tile.RLE = 0; break;
            case 1: tile.RLE = this.readUInt8(); break;
            default: tile.RLE = this.readInt16(); break;
        }

        return tile;
    }

    parseChests() {
        let data = {};

        data.chestsCount = this.readInt16();
        data.chestSpace = this.readInt16();
        data.overflow = data.chestSpace <= 40 ? 0 : data.chestSpace - 40;
        if (data.chestsCount)
            data.chests = [];

        for (let i = 0; i < data.chestsCount; i++) {
            data.chests[i] = {};
            data.chests[i].position = {
                x: this.readInt32(),
                y: this.readInt32()
            };
            data.chests[i].name = this.readString();
            if (data.chests[i].name == '')
                delete data.chests[i].name;

            for (let j = 0; j < data.chestSpace; j++) {
                const stack = this.readInt16();
                if (stack == 0)
                    continue;

                if (!data.chests[i].items)
                    data.chests[i].items = [];
                data.chests[i].items[j] = {};
                data.chests[i].items[j].stack  = stack;
                data.chests[i].items[j].id     = this.readInt32();
                data.chests[i].items[j].prefix = this.readUInt8();
            }

            // skipping overflow items
            for (let j = 0; j < data.overflow; j++) {
                if (this.readInt16() > 0)
                    this.skipBytes(5);
            }
        }

        return data;
    }

    parseSigns() {
        let data = {};

        data.signsCount = this.readInt16();

        if (data.signsCount)
            data.signs = [];
        for (let i = 0; i < data.signsCount; i++) {
            data.signs[i] = {};
            data.signs[i].text = this.readString();
            data.signs[i].position = {
                x: this.readInt32(),
                y: this.readInt32()
            };
        }

        return data;
    }

    parseNPCs() {
        let data = {};

        let i = 0;
        for (; this.readBoolean(); i++) {
            if (!data.NPCs)
                data.NPCs = [];
            data.NPCs[i] = {};
            data.NPCs[i].id = this.readInt32();
            data.NPCs[i].name = this.readString();
            data.NPCs[i].position = {
                x: this.readFloat32(),
                y: this.readFloat32(),
            };
            data.NPCs[i].homeless = this.readBoolean();
            data.NPCs[i].homePosition = {
                x: this.readInt32(),
                y: this.readInt32(),
            };
        }

        //pillars
        for (; this.readBoolean(); i++) {
            if (!data.pillars)
                data.pillars = [];
            data.pillars[i] = {};
            data.pillars[i].id = this.readInt32();

            data.pillars[i].position = {
                x: this.readFloat32(),
                y: this.readFloat32(),
            };
        }

        return data;
    }

    parseTileEntities() {
        let data = {};

        data.tileEntitiesCount = this.readInt32();
        if (data.tileEntitiesCount)
            data.tileEntities = [];

        for (let i = 0; i < data.tileEntitiesCount; i++ ) {
            data.tileEntities[i] = {};

            const type = this.readUInt8();
            data.tileEntities[i].id = this.readInt32();
            data.tileEntities[i].position = {
                x: this.readInt16(),
                y: this.readInt16()
            };

            switch (type) {
                //dummy
                case 0:
                    data.tileEntities[i].targetDummy = {
                        "npc": this.readInt16(),
                    }
                    break;
                //item frame
                case 1:
                    data.tileEntities[i].itemFrame = {
                        "itemId": this.readInt16(),
                        "prefix": this.readUInt8(),
                        "stack" : this.readInt16(),
                    }
                    break;
                //logic sensor
                case 2:
                    data.tileEntities[i].logicSensor = {
                        "logicCheck": this.readUInt8(),
                        "on"        : this.readBoolean(),
                    }
                    break;
            }

        }

        return data;
    }

    parseWeightedPressurePlates() {
        let data = {};

        data.pressurePlatesCount = this.readInt32();
        if (data.pressurePlatesCount)
            data.pressurePlates = [];

        for (let i = 0; i < data.pressurePlatesCount; i++ ) {
            data.pressurePlates[i].position = {
                x: this.readInt32(),
                y: this.readInt32()
            };
        }

        return data;
    }

    parseTownManager() {
        let data = {};

        data.roomsCount = this.readInt32();
        data.rooms = [];

        for (let i = 0; i < data.roomsCount; i++) {
            data.rooms[i] = {};
            data.rooms[i].npcId = this.readInt32();
            data.rooms[i].position = {
                x: this.readInt32(),
                y: this.readInt32()
            };
        }

        return data;
    }

    parseFooter() {
        let data = {};

        data.signoff1 = this.readBoolean();
        data.signoff2 = this.readString();
        data.signoff3 = this.readInt32();

        return data;
    }
}