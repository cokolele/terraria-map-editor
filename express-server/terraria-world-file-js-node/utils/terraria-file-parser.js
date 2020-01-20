const { readFileSync } = require("fs");

module.exports = class terrariaFileParser {
    constructor(path) {
        this.buffer = readFileSync( path , [null, "r+"]);
        this.offset = 0;
    }

    readUInt8() {
        this.offset += 1;
        return this.buffer[this.offset - 1];
    }

    readInt16() {
        this.offset += 2;
        return this.buffer.readInt16LE( this.offset - 2 );
    }

    readUInt16() {
        this.offset += 2;
        return this.buffer.readUInt16LE( this.offset - 2 );
    }

    readInt32() {
        this.offset += 4;
        return this.buffer.readInt32LE( this.offset - 4 );
    }

    readUInt32() {
        this.offset += 4;
        return this.buffer.readUInt32LE( this.offset - 4 );
    }

    readFloat32() {
        this.offset += 4;
        return this.buffer.readFloatLE( this.offset - 4 );
    }

    readFloat64() {
        this.offset += 8;
        return this.buffer.readDoubleLE( this.offset - 8 );
    }

    readBoolean() {
        return (!!this.readUInt8());
    }

    readBytes(count) {
        let data = [];
        for (let i = 0; i < count; i++)
            data[i] = this.readUInt8();

        return Buffer.from(data);
    }

    readString(length) {
        return this.readBytes( length ? length : this.readUInt8() ).toString("utf8");
    }

    skipBytes(count) {
        this.offset += count;
    }

    jumpTo(offset) {
        this.offset = offset;
    }
}