import LAYERS from "/utils/dbs/LAYERS.js";

let pointColors = {};

pointColors[LAYERS.TILES] = [
    {"r":151,"g":107,"b":75,"a":255},
    {"r":128,"g":128,"b":128,"a":255},
    {"r":28,"g":216,"b":94,"a":255},
    {"r":27,"g":197,"b":109,"a":255},
    {"r":253,"g":221,"b":3,"a":255},
    {"r":104,"g":76,"b":55,"a":255},
    {"r":140,"g":101,"b":80,"a":255},
    {"r":150,"g":67,"b":22,"a":255},
    {"r":185,"g":164,"b":23,"a":255},
    {"r":185,"g":194,"b":195,"a":255},
    {"r":119,"g":105,"b":79,"a":255},
    {"r":119,"g":105,"b":79,"a":255},
    {"r":174,"g":24,"b":69,"a":255},
    {"r":133,"g":213,"b":247,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":140,"g":130,"b":116,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":163,"g":116,"b":81,"a":255},
    {"r":233,"g":207,"b":94,"a":255},
    {"r":98,"g":95,"b":167,"a":255},
    {"r":141,"g":137,"b":223,"a":255},
    {"r":122,"g":116,"b":218,"a":255},
    {"r":109,"g":90,"b":128,"a":255},
    {"r":119,"g":101,"b":125,"a":255},
    {"r":226,"g":196,"b":49,"a":255},
    {"r":151,"g":79,"b":80,"a":255},
    {"r":175,"g":105,"b":128,"a":255},
    {"r":170,"g":120,"b":84,"a":255},
    {"r":141,"g":120,"b":168,"a":255},
    {"r":151,"g":135,"b":183,"a":255},
    {"r":253,"g":221,"b":3,"a":255},
    {"r":235,"g":166,"b":135,"a":255},
    {"r":197,"g":216,"b":219,"a":255},
    {"r":230,"g":89,"b":92,"a":255},
    {"r":104,"g":86,"b":84,"a":255},
    {"r":144,"g":144,"b":144,"a":255},
    {"r":181,"g":62,"b":59,"a":255},
    {"r":146,"g":81,"b":68,"a":255},
    {"r":66,"g":84,"b":109,"a":255},
    {"r":251,"g":235,"b":127,"a":255},
    {"r":84,"g":100,"b":63,"a":255},
    {"r":107,"g":68,"b":99,"a":255},
    {"r":185,"g":164,"b":23,"a":255},
    {"r":185,"g":194,"b":195,"a":255},
    {"r":150,"g":67,"b":22,"a":255},
    {"r":128,"g":128,"b":128,"a":255},
    {"r":43,"g":143,"b":255,"a":255},
    {"r":170,"g":48,"b":114,"a":255},
    {"r":192,"g":202,"b":203,"a":255},
    {"r":23,"g":177,"b":76,"a":255},
    {"r":255,"g":218,"b":56,"a":255},
    {"r":200,"g":246,"b":254,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":43,"g":40,"b":84,"a":255},
    {"r":68,"g":68,"b":76,"a":255},
    {"r":142,"g":66,"b":66,"a":255},
    {"r":92,"g":68,"b":73,"a":255},
    {"r":143,"g":215,"b":29,"a":255},
    {"r":135,"g":196,"b":26,"a":255},
    {"r":121,"g":176,"b":24,"a":255},
    {"r":110,"g":140,"b":182,"a":255},
    {"r":196,"g":96,"b":114,"a":255},
    {"r":56,"g":150,"b":97,"a":255},
    {"r":160,"g":118,"b":58,"a":255},
    {"r":140,"g":58,"b":166,"a":255},
    {"r":125,"g":191,"b":197,"a":255},
    {"r":190,"g":150,"b":92,"a":255},
    {"r":93,"g":127,"b":255,"a":255},
    {"r":182,"g":175,"b":130,"a":255},
    {"r":182,"g":175,"b":130,"a":255},
    {"r":27,"g":197,"b":109,"a":255},
    {"r":96,"g":197,"b":27,"a":255},
    {"r":36,"g":36,"b":36,"a":255},
    {"r":142,"g":66,"b":66,"a":255},
    {"r":238,"g":85,"b":70,"a":255},
    {"r":121,"g":110,"b":97,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":73,"g":120,"b":17,"a":255},
    {"r":245,"g":133,"b":191,"a":255},
    {"r":255,"g":120,"b":0,"a":255},
    {"r":255,"g":120,"b":0,"a":255},
    {"r":255,"g":120,"b":0,"a":255},
    {"r":192,"g":192,"b":192,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":13,"g":88,"b":130,"a":255},
    {"r":213,"g":229,"b":237,"a":255},
    {"r":253,"g":221,"b":3,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":255,"g":162,"b":31,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":253,"g":221,"b":3,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":253,"g":221,"b":3,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":229,"g":212,"b":73,"a":255},
    {"r":141,"g":98,"b":77,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":11,"g":80,"b":143,"a":255},
    {"r":91,"g":169,"b":169,"a":255},
    {"r":78,"g":193,"b":227,"a":255},
    {"r":48,"g":186,"b":135,"a":255},
    {"r":128,"g":26,"b":52,"a":255},
    {"r":103,"g":98,"b":122,"a":255},
    {"r":48,"g":208,"b":234,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":33,"g":171,"b":207,"a":255},
    {"r":238,"g":225,"b":218,"a":255},
    {"r":181,"g":172,"b":190,"a":255},
    {"r":238,"g":225,"b":218,"a":255},
    {"r":107,"g":92,"b":108,"a":255},
    {"r":92,"g":68,"b":73,"a":255},
    {"r":11,"g":80,"b":143,"a":255},
    {"r":91,"g":169,"b":169,"a":255},
    {"r":106,"g":107,"b":118,"a":255},
    {"r":73,"g":51,"b":36,"a":255},
    {"r":141,"g":175,"b":255,"a":255},
    {"r":159,"g":209,"b":229,"a":255},
    {"r":128,"g":204,"b":230,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":255,"g":117,"b":224,"a":255},
    {"r":160,"g":160,"b":160,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":231,"g":53,"b":56,"a":255},
    {"r":166,"g":187,"b":153,"a":255},
    {"r":253,"g":114,"b":114,"a":255},
    {"r":213,"g":203,"b":204,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":96,"g":96,"b":96,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":98,"g":95,"b":167,"a":255},
    {"r":192,"g":59,"b":59,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":192,"g":30,"b":30,"a":255},
    {"r":43,"g":192,"b":30,"a":255},
    {"r":211,"g":236,"b":241,"a":255},
    {"r":181,"g":211,"b":210,"a":255},
    {"r":220,"g":50,"b":50,"a":255},
    {"r":128,"g":26,"b":52,"a":255},
    {"r":190,"g":171,"b":94,"a":255},
    {"r":128,"g":133,"b":184,"a":255},
    {"r":239,"g":141,"b":126,"a":255},
    {"r":190,"g":171,"b":94,"a":255},
    {"r":131,"g":162,"b":161,"a":255},
    {"r":170,"g":171,"b":157,"a":255},
    {"r":104,"g":100,"b":126,"a":255},
    {"r":145,"g":81,"b":85,"a":255},
    {"r":148,"g":133,"b":98,"a":255},
    {"r":0,"g":0,"b":200,"a":255},
    {"r":144,"g":195,"b":232,"a":255},
    {"r":184,"g":219,"b":240,"a":255},
    {"r":174,"g":145,"b":214,"a":255},
    {"r":218,"g":182,"b":204,"a":255},
    {"r":100,"g":100,"b":100,"a":255},
    {"r":129,"g":125,"b":93,"a":255},
    {"r":62,"g":82,"b":114,"a":255},
    {"r":132,"g":157,"b":127,"a":255},
    {"r":152,"g":171,"b":198,"a":255},
    {"r":228,"g":219,"b":162,"a":255},
    {"r":33,"g":135,"b":85,"a":255},
    {"r":181,"g":194,"b":217,"a":255},
    {"r":253,"g":221,"b":3,"a":255},
    {"r":253,"g":221,"b":3,"a":255},
    {"r":129,"g":125,"b":93,"a":255},
    {"r":132,"g":157,"b":127,"a":255},
    {"r":152,"g":171,"b":198,"a":255},
    {"r":255,"g":0,"b":255,"a":255},
    {"r":49,"g":134,"b":114,"a":255},
    {"r":126,"g":134,"b":49,"a":255},
    {"r":134,"g":59,"b":49,"a":255},
    {"r":43,"g":86,"b":140,"a":255},
    {"r":121,"g":49,"b":134,"a":255},
    {"r":100,"g":100,"b":100,"a":255},
    {"r":149,"g":149,"b":115,"a":255},
    {"r":255,"g":0,"b":255,"a":255},
    {"r":255,"g":0,"b":255,"a":255},
    {"r":73,"g":120,"b":17,"a":255},
    {"r":223,"g":255,"b":255,"a":255},
    {"r":182,"g":175,"b":130,"a":255},
    {"r":104,"g":76,"b":55,"a":255},
    {"r":26,"g":196,"b":84,"a":255},
    {"r":56,"g":121,"b":255,"a":255},
    {"r":157,"g":157,"b":107,"a":255},
    {"r":134,"g":22,"b":34,"a":255},
    {"r":147,"g":144,"b":178,"a":255},
    {"r":97,"g":200,"b":225,"a":255},
    {"r":62,"g":61,"b":52,"a":255},
    {"r":208,"g":80,"b":80,"a":255},
    {"r":216,"g":152,"b":144,"a":255},
    {"r":203,"g":61,"b":64,"a":255},
    {"r":213,"g":178,"b":28,"a":255},
    {"r":128,"g":44,"b":45,"a":255},
    {"r":125,"g":55,"b":65,"a":255},
    {"r":186,"g":50,"b":52,"a":255},
    {"r":124,"g":175,"b":201,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":88,"g":105,"b":118,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":192,"g":59,"b":59,"a":255},
    {"r":191,"g":233,"b":115,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":137,"g":120,"b":67,"a":255},
    {"r":103,"g":103,"b":103,"a":255},
    {"r":254,"g":121,"b":2,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":239,"g":90,"b":50,"a":255},
    {"r":231,"g":96,"b":228,"a":255},
    {"r":57,"g":85,"b":101,"a":255},
    {"r":107,"g":132,"b":139,"a":255},
    {"r":227,"g":125,"b":22,"a":255},
    {"r":141,"g":56,"b":0,"a":255},
    {"r":255,"g":255,"b":255,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":255,"g":156,"b":12,"a":255},
    {"r":131,"g":79,"b":13,"a":255},
    {"r":224,"g":194,"b":101,"a":255},
    {"r":145,"g":81,"b":85,"a":255},
    {"r":255,"g":0,"b":255,"a":255},
    {"r":53,"g":44,"b":41,"a":255},
    {"r":214,"g":184,"b":46,"a":255},
    {"r":149,"g":232,"b":87,"a":255},
    {"r":255,"g":241,"b":51,"a":255},
    {"r":225,"g":128,"b":206,"a":255},
    {"r":224,"g":194,"b":101,"a":255},
    {"r":99,"g":50,"b":30,"a":255},
    {"r":77,"g":74,"b":72,"a":255},
    {"r":99,"g":50,"b":30,"a":255},
    {"r":140,"g":179,"b":254,"a":255},
    {"r":200,"g":245,"b":253,"a":255},
    {"r":99,"g":50,"b":30,"a":255},
    {"r":99,"g":50,"b":30,"a":255},
    {"r":140,"g":150,"b":150,"a":255},
    {"r":219,"g":71,"b":38,"a":255},
    {"r":249,"g":52,"b":243,"a":255},
    {"r":76,"g":74,"b":83,"a":255},
    {"r":235,"g":150,"b":23,"a":255},
    {"r":153,"g":131,"b":44,"a":255},
    {"r":57,"g":48,"b":97,"a":255},
    {"r":248,"g":158,"b":92,"a":255},
    {"r":107,"g":49,"b":154,"a":255},
    {"r":154,"g":148,"b":49,"a":255},
    {"r":49,"g":49,"b":154,"a":255},
    {"r":49,"g":154,"b":68,"a":255},
    {"r":154,"g":49,"b":77,"a":255},
    {"r":85,"g":89,"b":118,"a":255},
    {"r":154,"g":83,"b":49,"a":255},
    {"r":221,"g":79,"b":255,"a":255},
    {"r":250,"g":255,"b":79,"a":255},
    {"r":79,"g":102,"b":255,"a":255},
    {"r":79,"g":255,"b":89,"a":255},
    {"r":255,"g":79,"b":79,"a":255},
    {"r":240,"g":240,"b":247,"a":255},
    {"r":255,"g":145,"b":79,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":121,"g":119,"b":101,"a":255},
    {"r":128,"g":128,"b":128,"a":255},
    {"r":190,"g":171,"b":94,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":128,"g":128,"b":128,"a":255},
    {"r":150,"g":67,"b":22,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":79,"g":128,"b":17,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":117,"g":61,"b":25,"a":255},
    {"r":204,"g":93,"b":73,"a":255},
    {"r":87,"g":150,"b":154,"a":255},
    {"r":181,"g":164,"b":125,"a":255},
    {"r":235,"g":114,"b":80,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":96,"g":68,"b":48,"a":255},
    {"r":203,"g":185,"b":151,"a":255},
    {"r":96,"g":77,"b":64,"a":255},
    {"r":198,"g":170,"b":104,"a":255},
    {"r":182,"g":141,"b":86,"a":255},
    {"r":228,"g":213,"b":173,"a":255},
    {"r":129,"g":125,"b":93,"a":255},
    {"r":9,"g":61,"b":191,"a":255},
    {"r":253,"g":32,"b":3,"a":255},
    {"r":200,"g":246,"b":254,"a":255},
    {"r":15,"g":15,"b":15,"a":255},
    {"r":226,"g":118,"b":76,"a":255},
    {"r":161,"g":172,"b":173,"a":255},
    {"r":204,"g":181,"b":72,"a":255},
    {"r":190,"g":190,"b":178,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":217,"g":174,"b":137,"a":255},
    {"r":253,"g":62,"b":3,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":85,"g":255,"b":160,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":96,"g":248,"b":2,"a":255},
    {"r":105,"g":74,"b":202,"a":255},
    {"r":29,"g":240,"b":255,"a":255},
    {"r":254,"g":202,"b":80,"a":255},
    {"r":131,"g":252,"b":245,"a":255},
    {"r":255,"g":156,"b":12,"a":255},
    {"r":149,"g":212,"b":89,"a":255},
    {"r":236,"g":74,"b":79,"a":255},
    {"r":44,"g":26,"b":233,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":55,"g":97,"b":155,"a":255},
    {"r":31,"g":31,"b":31,"a":255},
    {"r":238,"g":97,"b":94,"a":255},
    {"r":28,"g":216,"b":94,"a":255},
    {"r":141,"g":107,"b":89,"a":255},
    {"r":141,"g":107,"b":89,"a":255},
    {"r":233,"g":203,"b":24,"a":255},
    {"r":168,"g":178,"b":204,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":146,"g":136,"b":205,"a":255},
    {"r":223,"g":232,"b":233,"a":255},
    {"r":168,"g":178,"b":204,"a":255},
    {"r":50,"g":46,"b":104,"a":255},
    {"r":50,"g":46,"b":104,"a":255},
    {"r":127,"g":116,"b":194,"a":255},
    {"r":249,"g":101,"b":189,"a":255},
    {"r":252,"g":128,"b":201,"a":255},
    {"r":9,"g":61,"b":191,"a":255},
    {"r":253,"g":32,"b":3,"a":255},
    {"r":255,"g":156,"b":12,"a":255},
    {"r":160,"g":120,"b":92,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":160,"g":120,"b":100,"a":255},
    {"r":251,"g":209,"b":240,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":254,"g":121,"b":2,"a":255},
    {"r":28,"g":216,"b":94,"a":255},
    {"r":221,"g":136,"b":144,"a":255},
    {"r":131,"g":206,"b":12,"a":255},
    {"r":87,"g":21,"b":144,"a":255},
    {"r":127,"g":92,"b":69,"a":255},
    {"r":127,"g":92,"b":69,"a":255},
    {"r":127,"g":92,"b":69,"a":255},
    {"r":127,"g":92,"b":69,"a":255},
    {"r":253,"g":32,"b":3,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":198,"g":124,"b":78,"a":255},
    {"r":212,"g":192,"b":100,"a":255},
    {"r":100,"g":82,"b":126,"a":255},
    {"r":77,"g":76,"b":66,"a":255},
    {"r":96,"g":68,"b":117,"a":255},
    {"r":68,"g":60,"b":51,"a":255},
    {"r":174,"g":168,"b":186,"a":255},
    {"r":205,"g":152,"b":186,"a":255},
    {"r":140,"g":84,"b":60,"a":255},
    {"r":140,"g":140,"b":140,"a":255},
    {"r":120,"g":120,"b":120,"a":255},
    {"r":255,"g":227,"b":132,"a":255},
    {"r":85,"g":83,"b":82,"a":255},
    {"r":85,"g":83,"b":82,"a":255},
    {"r":75,"g":139,"b":166,"a":255},
    {"r":227,"g":46,"b":46,"a":255},
    {"r":75,"g":139,"b":166,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":249,"g":75,"b":7,"a":255},
    {"r":0,"g":160,"b":170,"a":255},
    {"r":160,"g":87,"b":234,"a":255},
    {"r":22,"g":173,"b":254,"a":255},
    {"r":117,"g":125,"b":151,"a":255},
    {"r":255,"g":255,"b":255,"a":255},
    {"r":73,"g":70,"b":70,"a":255},
    {"r":73,"g":70,"b":70,"a":255},
    {"r":255,"g":255,"b":255,"a":255},
    {"r":146,"g":155,"b":187,"a":255},
    {"r":174,"g":195,"b":215,"a":255},
    {"r":77,"g":11,"b":35,"a":255},
    {"r":119,"g":22,"b":52,"a":255},
    {"r":255,"g":255,"b":255,"a":255},
    {"r":63,"g":63,"b":63,"a":255},
    {"r":23,"g":119,"b":79,"a":255},
    {"r":23,"g":54,"b":119,"a":255},
    {"r":119,"g":68,"b":23,"a":255},
    {"r":74,"g":23,"b":119,"a":255},
    {"r":78,"g":82,"b":109,"a":255},
    {"r":39,"g":168,"b":96,"a":255},
    {"r":39,"g":94,"b":168,"a":255},
    {"r":168,"g":121,"b":39,"a":255},
    {"r":111,"g":39,"b":168,"a":255},
    {"r":150,"g":148,"b":174,"a":255},
    {"r":255,"g":255,"b":255,"a":255},
    {"r":255,"g":255,"b":255,"a":255},
    {"r":3,"g":144,"b":201,"a":255},
    {"r":123,"g":123,"b":123,"a":255},
    {"r":191,"g":176,"b":124,"a":255},
    {"r":55,"g":55,"b":73,"a":255},
    {"r":255,"g":66,"b":152,"a":255},
    {"r":179,"g":132,"b":255,"a":255},
    {"r":0,"g":206,"b":180,"a":255},
    {"r":91,"g":186,"b":240,"a":255},
    {"r":92,"g":240,"b":91,"a":255},
    {"r":240,"g":91,"b":147,"a":255},
    {"r":255,"g":150,"b":181,"a":255},
    {"r":255,"g":255,"b":255,"a":255},
    {"r":174,"g":16,"b":176,"a":255},
    {"r":48,"g":255,"b":110,"a":255},
    {"r":179,"g":132,"b":255,"a":255},
    {"r":255,"g":255,"b":255,"a":255},
    {"r":211,"g":198,"b":111,"a":255},
    {"r":190,"g":223,"b":232,"a":255},
    {"r":141,"g":163,"b":181,"a":255},
    {"r":255,"g":222,"b":100,"a":255},
    {"r":231,"g":178,"b":28,"a":255},
    {"r":155,"g":214,"b":240,"a":255},
    {"r":233,"g":183,"b":128,"a":255},
    {"r":51,"g":84,"b":195,"a":255},
    {"r":205,"g":153,"b":73,"a":255},
    {"r":233,"g":207,"b":94,"a":255},
    {"r":255,"g":255,"b":255,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    //1.4
    {"r":191,"g":142,"b":111,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":190,"g":160,"b":140,"a":255},
    {"r":85,"g":114,"b":123,"a":255},
    {"r":116,"g":94,"b":97,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":160,"g":160,"b":160,"a":255},
    {"r":28,"g":216,"b":94,"a":255},
    {"r":108,"g":34,"b":35,"a":255},
    {"r":178,"g":114,"b":68,"a":255},
    {"r":120,"g":50,"b":50,"a":255},
    {"r":66,"g":84,"b":109,"a":155},
    {"r":84,"g":100,"b":63,"a":155},
    {"r":107,"g":68,"b":99,"a":155},
    {"r":73,"g":120,"b":17,"a":255},
    {"r":198,"g":134,"b":88,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":127,"g":92,"b":69,"a":255},
    {"r":255,"g":29,"b":136,"a":255},
    {"r":211,"g":211,"b":211,"a":255},
    {"r":60,"g":20,"b":160,"a":255},
    {"r":78,"g":193,"b":227,"a":255},
    {"r":78,"g":193,"b":227,"a":255},
    {"r":78,"g":193,"b":227,"a":255},
    {"r":250,"g":249,"b":252,"a":255},
    {"r":224,"g":219,"b":236,"a":255},
    {"r":227,"g":227,"b":227,"a":255},
    {"r":253,"g":227,"b":215,"a":255},
    {"r":165,"g":159,"b":153,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":202,"g":174,"b":165,"a":255},
    {"r":160,"g":187,"b":142,"a":255},
    {"r":254,"g":158,"b":35,"a":255},
    {"r":34,"g":221,"b":151,"a":255},
    {"r":249,"g":170,"b":236,"a":255},
    {"r":35,"g":200,"b":254,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":61,"g":61,"b":61,"a":255},
    {"r":5,"g":5,"b":5,"a":255},
    {"r":5,"g":5,"b":5,"a":255},
    {"r":50,"g":50,"b":60,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":187,"g":68,"b":74,"a":255},
    {"r":49,"g":134,"b":114,"a":255},
    {"r":126,"g":134,"b":49,"a":255},
    {"r":134,"g":59,"b":49,"a":255},
    {"r":43,"g":86,"b":140,"a":255},
    {"r":121,"g":49,"b":134,"a":255},
    {"r":254,"g":121,"b":2,"a":255},
    {"r":26,"g":196,"b":84,"a":255},
    {"r":28,"g":216,"b":109,"a":255},
    {"r":224,"g":219,"b":236,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":182,"g":175,"b":130,"a":255},
    {"r":99,"g":150,"b":8,"a":255},
    {"r":107,"g":182,"b":0,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":114,"g":254,"b":2,"a":255},
    {"r":114,"g":254,"b":2,"a":255},
    {"r":0,"g":197,"b":208,"a":255},
    {"r":0,"g":197,"b":208,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":208,"g":0,"b":126,"a":255},
    {"r":208,"g":0,"b":126,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":255,"g":126,"b":145,"a":255},
    {"r":60,"g":60,"b":60,"a":255},
    {"r":120,"g":110,"b":100,"a":255},
    {"r":120,"g":110,"b":100,"a":255},
    {"r":54,"g":83,"b":20,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":186,"g":168,"b":84,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":60,"g":60,"b":60,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":150,"g":67,"b":22,"a":255},
    {"r":148,"g":158,"b":184,"a":255},
    {"r":165,"g":168,"b":26,"a":255},
    {"r":165,"g":168,"b":26,"a":255},
    {"r":87,"g":127,"b":220,"a":255},
    {"r":99,"g":99,"b":99,"a":255},
    {"r":233,"g":180,"b":90,"a":255},
    {"r":144,"g":148,"b":144,"a":255},
    {"r":248,"g":203,"b":233,"a":255},
    {"r":203,"g":248,"b":218,"a":255},
    {"r":160,"g":242,"b":255,"a":255},
    {"r":165,"g":168,"b":26,"a":255},
    {"r":255,"g":186,"b":212,"a":255},
    {"r":191,"g":142,"b":111,"a":255},
    {"r":76,"g":57,"b":44,"a":255},
    {"r":125,"g":61,"b":65,"a":255},
    {"r":30,"g":26,"b":84,"a":255},
    {"r":178,"g":104,"b":58,"a":255},
    {"r":172,"g":155,"b":110,"a":255},
    {"r":99,"g":99,"b":99,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":255,"g":150,"b":150,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":134,"g":120,"b":107,"a":255},//changed the stone trees to be different than stone, might be wrong
    {"r":134,"g":120,"b":107,"a":255},//changed the stone trees to be different than stone, might be wrong
    {"r":134,"g":120,"b":107,"a":255},//changed the stone trees to be different than stone, might be wrong
    {"r":134,"g":120,"b":107,"a":255},//changed the stone trees to be different than stone, might be wrong
    {"r":134,"g":120,"b":107,"a":255},//changed the stone trees to be different than stone, might be wrong
    {"r":134,"g":120,"b":107,"a":255},//changed the stone trees to be different than stone, might be wrong
    {"r":134,"g":120,"b":107,"a":255},//changed the stone trees to be different than stone, might be wrong
    {"r":134,"g":120,"b":107,"a":255},//changed the stone trees to be different than stone, might be wrong
    {"r":114,"g":81,"b":56,"a":255},
    {"r":254,"g":121,"b":2,"a":255},
    {"r":119,"g":105,"b":79,"a":255},
    {"r":119,"g":105,"b":79,"a":255},
    {"r":104,"g":76,"b":55,"a":255},//changed the wood to be different than dirt, might be wrong
    {"r":104,"g":76,"b":55,"a":255},//changed the wood to be different than dirt, might be wrong
    {"r":28,"g":216,"b":94,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":250,"g":100,"b":50,"a":255},
    {"r":250,"g":100,"b":50,"a":255},
    {"r":104,"g":76,"b":55,"a":255},//changed the wood to be different than dirt, might be wrong
    {"r":104,"g":76,"b":55,"a":255},//changed the wood to be different than dirt, might be wrong
    {"r":233,"g":207,"b":94,"a":255},
    {"r":128,"g":128,"b":128,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":122,"g":217,"b":232,"a":255},
    {"r":250,"g":250,"b":250,"a":255},
    {"r":235,"g":235,"b":249,"a":255}
];

pointColors[LAYERS.WALLS] = [
    null,
    {"r":52,"g":52,"b":52,"a":255},
    {"r":88,"g":61,"b":46,"a":255},
    {"r":61,"g":58,"b":78,"a":255},
    {"r":73,"g":51,"b":36,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":91,"g":30,"b":30,"a":255},
    {"r":27,"g":31,"b":42,"a":255},
    {"r":31,"g":39,"b":26,"a":255},
    {"r":41,"g":28,"b":36,"a":255},
    {"r":74,"g":62,"b":12,"a":255},
    {"r":46,"g":56,"b":59,"a":255},
    {"r":75,"g":32,"b":11,"a":255},
    {"r":67,"g":37,"b":37,"a":255},
    {"r":15,"g":15,"b":15,"a":255},
    {"r":52,"g":43,"b":45,"a":255},
    {"r":88,"g":61,"b":46,"a":255},
    {"r":27,"g":31,"b":42,"a":255},
    {"r":31,"g":39,"b":26,"a":255},
    {"r":41,"g":28,"b":36,"a":255},
    {"r":15,"g":15,"b":15,"a":255},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":113,"g":99,"b":99,"a":255},
    {"r":38,"g":38,"b":43,"a":255},
    {"r":53,"g":39,"b":41,"a":255},
    {"r":11,"g":35,"b":62,"a":255},
    {"r":21,"g":63,"b":70,"a":255},
    {"r":88,"g":61,"b":46,"a":255},
    {"r":81,"g":84,"b":101,"a":255},
    {"r":88,"g":23,"b":23,"a":255},
    {"r":28,"g":88,"b":23,"a":255},
    {"r":78,"g":87,"b":99,"a":255},
    {"r":86,"g":17,"b":40,"a":255},
    {"r":49,"g":47,"b":83,"a":255},
    {"r":69,"g":67,"b":41,"a":255},
    {"r":51,"g":51,"b":70,"a":255},
    {"r":87,"g":59,"b":55,"a":255},
    {"r":69,"g":67,"b":41,"a":255},
    {"r":49,"g":57,"b":49,"a":255},
    {"r":78,"g":79,"b":73,"a":255},
    {"r":85,"g":102,"b":103,"a":255},
    {"r":52,"g":50,"b":62,"a":255},
    {"r":71,"g":42,"b":44,"a":255},
    {"r":73,"g":66,"b":50,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":60,"g":59,"b":51,"a":255},
    {"r":48,"g":57,"b":47,"a":255},
    {"r":71,"g":77,"b":85,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":40,"g":56,"b":50,"a":255},
    {"r":49,"g":48,"b":36,"a":255},
    {"r":43,"g":33,"b":32,"a":255},
    {"r":31,"g":40,"b":49,"a":255},
    {"r":48,"g":35,"b":52,"a":255},
    {"r":88,"g":61,"b":46,"a":255},
    {"r":1,"g":52,"b":20,"a":255},
    {"r":55,"g":39,"b":26,"a":255},
    {"r":39,"g":33,"b":26,"a":255},
    {"r":30,"g":80,"b":48,"a":255},
    {"r":53,"g":80,"b":30,"a":255},
    {"r":30,"g":80,"b":48,"a":255},
    {"r":30,"g":80,"b":48,"a":255},
    {"r":53,"g":80,"b":30,"a":255},
    {"r":30,"g":80,"b":48,"a":255},
    {"r":43,"g":42,"b":68,"a":255},
    {"r":30,"g":70,"b":80,"a":255},
    {"r":78,"g":105,"b":135,"a":255},
    {"r":52,"g":84,"b":12,"a":255},
    {"r":190,"g":204,"b":223,"a":255},
    {"r":64,"g":62,"b":80,"a":255},
    {"r":65,"g":65,"b":35,"a":255},
    {"r":20,"g":46,"b":104,"a":255},
    {"r":61,"g":13,"b":16,"a":255},
    {"r":63,"g":39,"b":26,"a":255},
    {"r":51,"g":47,"b":96,"a":255},
    {"r":64,"g":62,"b":80,"a":255},
    {"r":101,"g":51,"b":51,"a":255},
    {"r":77,"g":64,"b":34,"a":255},
    {"r":62,"g":38,"b":41,"a":255},
    {"r":48,"g":78,"b":93,"a":255},
    {"r":54,"g":63,"b":69,"a":255},
    {"r":138,"g":73,"b":38,"a":255},
    {"r":50,"g":15,"b":8,"a":255},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":32,"g":40,"b":45,"a":255},
    {"r":44,"g":41,"b":50,"a":255},
    {"r":72,"g":50,"b":77,"a":255},
    {"r":78,"g":50,"b":69,"a":255},
    {"r":36,"g":45,"b":44,"a":255},
    {"r":38,"g":49,"b":50,"a":255},
    {"r":32,"g":40,"b":45,"a":255},
    {"r":44,"g":41,"b":50,"a":255},
    {"r":72,"g":50,"b":77,"a":255},
    {"r":78,"g":50,"b":69,"a":255},
    {"r":36,"g":45,"b":44,"a":255},
    {"r":38,"g":49,"b":50,"a":255},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":138,"g":73,"b":38,"a":255},
    {"r":94,"g":25,"b":17,"a":255},
    {"r":125,"g":36,"b":122,"a":255},
    {"r":51,"g":35,"b":27,"a":255},
    {"r":50,"g":15,"b":8,"a":255},
    {"r":135,"g":58,"b":0,"a":255},
    {"r":65,"g":52,"b":15,"a":255},
    {"r":39,"g":42,"b":51,"a":255},
    {"r":89,"g":26,"b":27,"a":255},
    {"r":126,"g":123,"b":115,"a":255},
    {"r":8,"g":50,"b":19,"a":255},
    {"r":95,"g":21,"b":24,"a":255},
    {"r":17,"g":31,"b":65,"a":255},
    {"r":192,"g":173,"b":143,"a":255},
    {"r":114,"g":114,"b":131,"a":255},
    {"r":136,"g":119,"b":7,"a":255},
    {"r":8,"g":72,"b":3,"a":255},
    {"r":117,"g":132,"b":82,"a":255},
    {"r":100,"g":102,"b":114,"a":255},
    {"r":30,"g":118,"b":226,"a":255},
    {"r":93,"g":6,"b":102,"a":255},
    {"r":64,"g":40,"b":169,"a":255},
    {"r":39,"g":34,"b":180,"a":255},
    {"r":87,"g":94,"b":125,"a":255},
    {"r":6,"g":6,"b":6,"a":255},
    {"r":69,"g":72,"b":186,"a":255},
    {"r":130,"g":62,"b":16,"a":255},
    {"r":22,"g":123,"b":163,"a":255},
    {"r":40,"g":86,"b":151,"a":255},
    {"r":183,"g":75,"b":15,"a":255},
    {"r":83,"g":80,"b":100,"a":255},
    {"r":115,"g":65,"b":68,"a":255},
    {"r":119,"g":108,"b":81,"a":255},
    {"r":59,"g":67,"b":71,"a":255},
    {"r":17,"g":172,"b":143,"a":255},
    {"r":90,"g":112,"b":105,"a":255},
    {"r":62,"g":28,"b":87,"a":255},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":120,"g":59,"b":19,"a":255},
    {"r":59,"g":59,"b":59,"a":255},
    {"r":229,"g":218,"b":161,"a":255},
    {"r":73,"g":59,"b":50,"a":255},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":102,"g":75,"b":34,"a":255},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":255,"g":145,"b":79,"a":255},
    {"r":221,"g":79,"b":255,"a":255},
    {"r":240,"g":240,"b":247,"a":255},
    {"r":79,"g":255,"b":89,"a":255},
    {"r":154,"g":83,"b":49,"a":255},
    {"r":107,"g":49,"b":154,"a":255},
    {"r":85,"g":89,"b":118,"a":255},
    {"r":49,"g":154,"b":68,"a":255},
    {"r":154,"g":49,"b":77,"a":255},
    {"r":49,"g":49,"b":154,"a":255},
    {"r":154,"g":148,"b":49,"a":255},
    {"r":255,"g":79,"b":79,"a":255},
    {"r":79,"g":102,"b":255,"a":255},
    {"r":250,"g":255,"b":79,"a":255},
    {"r":70,"g":68,"b":51,"a":255},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":5,"g":5,"b":5,"a":255},
    {"r":59,"g":39,"b":22,"a":255},
    {"r":59,"g":39,"b":22,"a":255},
    {"r":163,"g":96,"b":0,"a":255},
    {"r":94,"g":163,"b":46,"a":255},
    {"r":117,"g":32,"b":59,"a":255},
    {"r":20,"g":11,"b":203,"a":255},
    {"r":74,"g":69,"b":88,"a":255},
    {"r":60,"g":30,"b":30,"a":255},
    {"r":111,"g":117,"b":135,"a":255},
    {"r":111,"g":117,"b":135,"a":255},
    {"r":25,"g":23,"b":54,"a":255},
    {"r":25,"g":23,"b":54,"a":255},
    {"r":74,"g":71,"b":129,"a":255},
    {"r":111,"g":117,"b":135,"a":255},
    {"r":25,"g":23,"b":54,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":38,"g":9,"b":66,"a":255},
    {"r":149,"g":80,"b":51,"a":255},
    {"r":82,"g":63,"b":80,"a":255},
    {"r":65,"g":61,"b":77,"a":255},
    {"r":64,"g":65,"b":92,"a":255},
    {"r":76,"g":53,"b":84,"a":255},
    {"r":144,"g":67,"b":52,"a":255},
    {"r":149,"g":48,"b":48,"a":255},
    {"r":111,"g":32,"b":36,"a":255},
    {"r":147,"g":48,"b":55,"a":255},
    {"r":97,"g":67,"b":51,"a":255},
    {"r":112,"g":80,"b":62,"a":255},
    {"r":88,"g":61,"b":46,"a":255},
    {"r":127,"g":94,"b":76,"a":255},
    {"r":143,"g":50,"b":123,"a":255},
    {"r":136,"g":120,"b":131,"a":255},
    {"r":219,"g":92,"b":143,"a":255},
    {"r":113,"g":64,"b":150,"a":255},
    {"r":74,"g":67,"b":60,"a":255},
    {"r":60,"g":78,"b":59,"a":255},
    {"r":0,"g":54,"b":21,"a":255},
    {"r":74,"g":97,"b":72,"a":255},
    {"r":40,"g":37,"b":35,"a":255},
    {"r":77,"g":63,"b":66,"a":255},
    {"r":111,"g":6,"b":6,"a":255},
    {"r":88,"g":67,"b":59,"a":255},
    {"r":88,"g":87,"b":80,"a":255},
    {"r":71,"g":71,"b":67,"a":255},
    {"r":76,"g":52,"b":60,"a":255},
    {"r":89,"g":48,"b":59,"a":255},
    {"r":158,"g":100,"b":64,"a":255},
    {"r":62,"g":45,"b":75,"a":255},
    {"r":57,"g":14,"b":12,"a":255},
    {"r":96,"g":72,"b":133,"a":255},
    {"r":67,"g":55,"b":80,"a":255},
    {"r":64,"g":37,"b":29,"a":255},
    {"r":70,"g":51,"b":91,"a":255},
    {"r":51,"g":18,"b":4,"a":255},
    {"r":57,"g":55,"b":52,"a":255},
    {"r":68,"g":68,"b":68,"a":255},
    {"r":148,"g":138,"b":74,"a":255},
    {"r":95,"g":137,"b":191,"a":255},
    {"r":160,"g":2,"b":75,"a":255},
    {"r":100,"g":55,"b":164,"a":255},
    {"r":0,"g":117,"b":101,"a":255},
    //1.4
    {"r":110,"g":90,"b":78,"a":255},
    {"r":47,"g":69,"b":75,"a":255},
    {"r":91,"g":67,"b":70,"a":255},
    {"r":60,"g":36,"b":39,"a":255},
    {"r":140,"g":75,"b":48,"a":255},
    {"r":127,"g":49,"b":44,"a":255},
    {"r":200,"g":44,"b":18,"a":255},
    {"r":24,"g":93,"b":66,"a":255},
    {"r":160,"g":87,"b":234,"a":255},
    {"r":6,"g":106,"b":255,"a":255},
    {"r":0,"g":0,"b":0,"a":0},
    {"r":5,"g":5,"b":5,"a":255},
    {"r":5,"g":5,"b":5,"a":255},
    {"r":63,"g":39,"b":26,"a":255},
    {"r":102,"g":102,"b":102,"a":255},
    {"r":61,"g":58,"b":78,"a":255},
    {"r":52,"g":43,"b":45,"a":255},
    {"r":81,"g":84,"b":101,"a":255},
    {"r":85,"g":102,"b":103,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":40,"g":56,"b":50,"a":255},
    {"r":49,"g":48,"b":36,"a":255},
    {"r":43,"g":33,"b":32,"a":255},
    {"r":31,"g":40,"b":49,"a":255},
    {"r":48,"g":35,"b":52,"a":255},
    {"r":88,"g":61,"b":46,"a":255},
    {"r":55,"g":39,"b":26,"a":255},
    {"r":39,"g":33,"b":26,"a":255},
    {"r":43,"g":42,"b":68,"a":255},
    {"r":30,"g":70,"b":80,"a":255},
    {"r":78,"g":105,"b":135,"a":255},
    {"r":51,"g":47,"b":96,"a":255},
    {"r":101,"g":51,"b":51,"a":255},
    {"r":62,"g":38,"b":41,"a":255},
    {"r":59,"g":39,"b":22,"a":255},
    {"r":59,"g":39,"b":22,"a":255},
    {"r":111,"g":117,"b":135,"a":255},
    {"r":25,"g":23,"b":54,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":149,"g":80,"b":51,"a":255},
    {"r":82,"g":63,"b":80,"a":255},
    {"r":65,"g":61,"b":77,"a":255},
    {"r":64,"g":65,"b":92,"a":255},
    {"r":76,"g":53,"b":84,"a":255},
    {"r":144,"g":67,"b":52,"a":255},
    {"r":149,"g":48,"b":48,"a":255},
    {"r":111,"g":32,"b":36,"a":255},
    {"r":147,"g":48,"b":55,"a":255},
    {"r":97,"g":67,"b":51,"a":255},
    {"r":112,"g":80,"b":62,"a":255},
    {"r":88,"g":61,"b":46,"a":255},
    {"r":127,"g":94,"b":76,"a":255},
    {"r":143,"g":50,"b":123,"a":255},
    {"r":136,"g":120,"b":131,"a":255},
    {"r":219,"g":92,"b":143,"a":255},
    {"r":113,"g":64,"b":150,"a":255},
    {"r":74,"g":67,"b":60,"a":255},
    {"r":60,"g":78,"b":59,"a":255},
    {"r":0,"g":54,"b":21,"a":255},
    {"r":74,"g":97,"b":72,"a":255},
    {"r":40,"g":37,"b":35,"a":255},
    {"r":77,"g":63,"b":66,"a":255},
    {"r":111,"g":6,"b":6,"a":255},
    {"r":88,"g":67,"b":59,"a":255},
    {"r":88,"g":87,"b":80,"a":255},
    {"r":71,"g":71,"b":67,"a":255},
    {"r":76,"g":52,"b":60,"a":255},
    {"r":89,"g":48,"b":59,"a":255},
    {"r":158,"g":100,"b":64,"a":255},
    {"r":62,"g":45,"b":75,"a":255},
    {"r":57,"g":14,"b":12,"a":255},
    {"r":96,"g":72,"b":133,"a":255},
    {"r":67,"g":55,"b":80,"a":255},
    {"r":64,"g":37,"b":29,"a":255},
    {"r":70,"g":51,"b":91,"a":255},
    {"r":51,"g":18,"b":4,"a":255},
    {"r":78,"g":110,"b":51,"a":255},
    {"r":78,"g":110,"b":51,"a":255},
    {"r":52,"g":52,"b":52,"a":255},
    {"r":181,"g":230,"b":29,"a":255}
];
/*
pointColors[LAYERS.WALLS_PAINTED] = {
    {"r":210,"g":144,"b":45,"a":125},
    {"r":255,"g":30,"b":30,"a":125},
    {"r":255,"g":30,"b":30,"a":175},
    {"r":255,"g":102,"b":0,"a":125},
    {"r":255,"g":102,"b":0,"a":175},
    {"r":255,"g":255,"b":0,"a":125},
    {"r":255,"g":255,"b":0,"a":175},
}*/

pointColors[LAYERS.LIQUIDS] = {
    "water": {"r":51,"g":133,"b":255,"a":155},
    "lava": {"r":212,"g":17,"b":17,"a":155},
    "honey": {"r":255,"g":255,"b":0,"a":155}
};

pointColors[LAYERS.BACKGROUND] = {
    "space": {"r":51,"g":102,"b":153,"a":255},
    "sky": {"r":155,"g":209,"b":255,"a":255},
    "ground": {"r":84,"g":57,"b":42,"a":255},
    "cavern": {"r":72,"g":64,"b":57,"a":255},
    "underworld": {"r":51,"g":0,"b":0,"a":255}
};

pointColors[LAYERS.WIRES] = {
    "red": {"r":255,"g":0,"b":0,"a":100},
    "green": {"r":0,"g":255,"b":0,"a":100},
    "blue": {"r":0,"g":0,"b":255,"a":100},
    "yellow": {"r":255,"g":255,"b":0,"a":100}
};

export default pointColors;