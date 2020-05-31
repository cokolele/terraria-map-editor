let array = [];
for (let i = 0; i < 623; i++)
    array[i] = [];

class Color {
    constructor(r,g,b) {
        return {r, g, b, a: 255};
    }
}

/*
    insert MapHelper.cs init code here
    replace "Color color" with "let color"
    fix loops
*/

const fs = require("fs");

fs.writeFileSync("hmm3.json", "[");
array.forEach((e, i) => {
    if (i == 481 || i == 482 || i == 483)
        e[0].a = 155;
    if (i == 160)
        e = [{r:255,g:255,b:255,a:255}];

    if (e.length == 0)
        e[0] = {r:0,g:0,b:0,a:0};

    if (e.length == 1)
        fs.appendFileSync("hmm3.json", `\n    {r:${e[0].r},g:${e[0].g},b:${e[0].b},a:${e[0].a}},`);
    else {
        //all options same
        for (let i = 0; i < 12; i++) {
            if (e[i+1] === undefined) {
                fs.appendFileSync("hmm3.json", `\n    {r:${e[0].r},g:${e[0].g},b:${e[0].b},a:${e[0].a}},`);
                return;
            }
            else if (JSON.stringify(e[i]) != JSON.stringify(e[i+1]))
                break;
        }

        fs.appendFileSync("hmm3.json", `\n    [`);
        e.forEach(f => {
            if (f.r)
                fs.appendFileSync("hmm3.json", `\n        {r:${f.r},g:${f.g},b:${f.b},a:${f.a}},`);
        });
        fs.appendFileSync("hmm3.json", `\n    ],`);
    }
})
fs.appendFileSync("hmm3.json", "\n]");