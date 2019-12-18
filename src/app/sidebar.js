/*
    $   editable text field
    !$  non-editable text
    &   checkbox
*/

export default {
    General: {
        "world name": "$mapName",
        "world id": "!$worldId",
        "seed": "!$seedText",
        "world size (blocks)": "!$maxTilesX x !$maxTilesY",
        "world size (pixels)": "!$rightWorld x !$bottomWorld",
        "spawn point": "X $spawnTileX Y $spawnTileY",
        "dungeon point": "X $dungeonX Y $dungeonY",
        "__DIVIDER___": "",
        "expert mode": "&expertMode",
        "hard mode": "&hardMode",
        "is crimson": "&crimson",
        "hardmore ore 1": {
            "for": "oreTier1",
            "type": "select",
            "options": {
                "none": -1,
                "cobalt": 107,
                "palladium": 221,
            }
        },
        "hardmore ore 2": {
            "for": "oreTier2",
            "type": "select",
            "options": {
                "none": -1,
                "mythril": 108,
                "orichalcum": 222,
            }
        },
        "hardmore ore 3": {
            "for": "oreTier3",
            "type": "select",
            "options": {
                "none": -1,
                "adamantite": 111,
                "titanium": 223,
            }
        }
    },
    "NPCs": {}
}