import "/utils/polyfills/polyfill-requestAnimationFrame.js";

import store from "/state/store.js";
import { stateChange } from "/state/state.js";

import LAYERS from "/utils/dbs/LAYERS.js";
import sprite, { NPCsSprites } from "/utils/dbs/sprites.js";

import extensions from "/canvas/extensions/index.js";
import workerInterfaces from "/canvas/workerInterfaces/main/index.js";

import onCanvasClick from "/canvas/listeners/click.js";
import onCanvasMove from "/canvas/listeners/move.js";
import onCanvasWheel from "/canvas/listeners/wheel.js";

let Main = new function() {
    this.state;
    this.canvas, this.ctx;
    this.layersImages, this.layersCtxs;
    this.worker;

    this.zoomLevel;
    this.zoomFactors;
    this.tilePixelRatio, this.viewWidthTiles, this.viewHeightTiles;

    this.posX, this.posY;
    this.mousePosElementX, this.mousePosElementY;
    this.mousePosImageX, this.mousePosImageY;

    this.workerInterfaces = workerInterfaces;
    this.extensions = extensions;
    this.listeners = {};

    this.brush = new Image(1, 1);
    this.brush.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWPjfBwAENwHuUNRdVAAAAABJRU5ErkJggg==";

    this.resetWorker = () => {
        if (this.worker)
            this.worker.terminate();
        this.worker = new Worker("./worker.js");
    }

    this.init = (canvasEl) => {
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext("2d");
        this.resetWorker();
        this.initListeners();
    }

    this.initListeners = () => {
        this.canvas.addEventListener("mousemove", async (e) => {
            [this.mousePosImageX, this.mousePosImageY, this.mousePosElementX, this.mousePosElementY] = this.extensions.getMousePosImage(e, true);
        });

/*
        this.canvas.addEventListener("mouseenter", async (e) => {
            if (this.state.toolbar.tool == "tileInfo" && !this.listeners.infoCursor) {
                Main.canvas.classList.add("cursorInfo");
                this.listeners.infoCursor = true;
            }
        });

        this.canvas.addEventListener("mouseleave", async (e) => {
            if (this.state.toolbar.tool != "tileInfo" && this.listeners.infoCursor) {
                Main.canvas.classList.remove("cursorInfo");
                this.listeners.infoCursor = false;
            }
        });

        this.canvas.addEventListener("click", async (e) => {
            if (this.state.toolbar.tool == "tileInfo") {
                let tileData = await this.workerInterfaces.getTileData(this.mousePosImageX, this.mousePosImageY);
                store.dispatch(stateChange("tileData", tileData));
            }
        });
*/

        this.canvas.addEventListener("mousedown", (e) => {
            if (e.buttons == 4 || (e.buttons == 1 && Main.state.toolbar.tool == "move"))
                Main.canvas.classList.add("cursorGrabbed");
        });

        this.canvas.addEventListener("mouseup", (e) => {
            Main.canvas.classList.remove("cursorGrabbed");
        });

        this.canvas.addEventListener("click", onCanvasClick);
        this.canvas.addEventListener("mousemove", onCanvasMove);
        this.canvas.addEventListener("wheel", onCanvasWheel);
    }

    this.updateLayers = (LAYER) => {
        if (LAYER)
            this.layersCtxs[LAYER].putImageData(this.layersImages[LAYER], 0, 0);
        else
            Object.values(LAYERS).forEach(LAYER => {
                this.layersCtxs[LAYER].putImageData(this.layersImages[LAYER], 0, 0);
            });
    }

    this.loop = {};
    let temp0, temp1, temp2, temp3;

    this.loop.start = () => {
        this.layersCtxs = Object.values(LAYERS).map(LAYER => {
            const _tmpCtx = document.createElement("canvas").getContext("2d");
            _tmpCtx.canvas.width = this.state.canvas.worldObject.header.maxTilesX;
            _tmpCtx.canvas.height = this.state.canvas.worldObject.header.maxTilesY;
            return _tmpCtx;
        });
        this.updateLayers();

        this.posX = 0;
        this.posY = 0;
        this.zoomLevel = 0;
        this.zoomFactors = [];
        for (let i = this.state.canvas.worldObject.header.maxTilesY; i > 10; i = Math.ceil(i * (3.5/5)))
            this.zoomFactors.push(i);
        this.zoomFactors.push(10);
        this.viewHeightTiles = this.zoomFactors[0];

        this.state.canvas.running = true;
        this.loop.tick();
        store.dispatch(stateChange(["canvas", "running"], true));
    }

    this.loop.stop = () => {
        this.state.canvas.running = false;
        delete this.layersImages;
        delete this.layersCtxs;
        this.resetWorker();
        store.dispatch(stateChange(["canvas", "running"], false));
    }

    this.loop.tick = () => {
        if (!this.state.canvas.running)
            return;

        this.loop.refreshCanvas();
        //in case user resizes the window
        this.loop.updateViewTiles();
        this.loop.correntPositions();
        this.loop.drawLayers();

        if (this.state.toolbar.tool == "pencil" || this.state.toolbar.tool == "eraser")
            this.loop.drawBrush();

        requestAnimationFrame(this.loop.tick, this.canvas);
    }

    this.loop.refreshCanvas = () => {
        this.canvas.width = 0;
        this.canvas.height = 0;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
    }

    this.loop.updateViewTiles = () => {
        this.tilePixelRatio = this.canvas.clientHeight / this.viewHeightTiles;
        this.viewWidthTiles = this.canvas.width / this.tilePixelRatio;
    }

    this.loop.correntPositions = () => {
        if (this.posX < 0)
            this.posX = 0;
        if (this.posY < 0)
            this.posY = 0;
        if (this.posY + this.viewHeightTiles > this.state.canvas.worldObject.header.maxTilesY && this.posY > 0)
            if (this.state.canvas.worldObject.header.maxTilesY - this.viewHeightTiles < 0)
                this.posY = 0;
            else
                this.posY = this.state.canvas.worldObject.header.maxTilesY - this.viewHeightTiles;
        if (this.posX + this.viewWidthTiles > this.state.canvas.worldObject.header.maxTilesX && this.posX > 0)
            if (this.state.canvas.worldObject.header.maxTilesX - this.viewWidthTiles < 0)
                this.posX = 0;
            else
                this.posX = this.state.canvas.worldObject.header.maxTilesX - this.viewWidthTiles;
    }

    this.loop.drawLayers = () => {
        Object.values(LAYERS).forEach(LAYER => {
            if (this.state.layersVisibility[LAYER])
                this.ctx.drawImage(this.layersCtxs[LAYER].canvas,
                    this.posX, this.posY,
                    this.viewWidthTiles, this.viewHeightTiles,
                    0, 0,
                    this.canvas.width, this.canvas.height);
        });

        if (this.state.canvas.worldObject.NPCs && this.state.layersVisibility.NPCs)
            this.state.canvas.worldObject.NPCs.forEach(npc => {
                try {
                    temp0 = NPCsSprites[npc.id][2] * ( 2 + this.zoomLevel * 0.2 );
                    temp1 = NPCsSprites[npc.id][3] * ( 2 + this.zoomLevel * 0.2 );

                    if (npc.townNPC)
                        this.ctx.drawImage(sprite,
                            NPCsSprites[npc.id][0], NPCsSprites[npc.id][1], NPCsSprites[npc.id][2], NPCsSprites[npc.id][3],
                            npc.homePosition.x * this.tilePixelRatio - this.posX * this.tilePixelRatio - temp0 / 2, npc.homePosition.y * this.tilePixelRatio - this.posY * this.tilePixelRatio - temp1, temp0, temp1);
                    else
                        this.ctx.drawImage(sprite,
                            NPCsSprites[npc.id][0], NPCsSprites[npc.id][1], NPCsSprites[npc.id][2], NPCsSprites[npc.id][3],
                            (npc.position.x / 16) * this.tilePixelRatio - this.posX * this.tilePixelRatio - temp0 / 2, (npc.position.y / 16) * this.tilePixelRatio - this.posY * this.tilePixelRatio - temp1, temp0, temp1);
                    }
                catch(e) {
                }
            });
    }

    this.loop.drawBrush = () => {
        if (typeof this.state.optionbar.size == "number") {
            temp0 = this.state.optionbar.size * this.tilePixelRatio;
            temp1 = temp0 / 2;

            if (this.state.optionbar.size % 2 == 0)
                temp1 += this.tilePixelRatio / 2;

            this.ctx.drawImage(
                this.brush,
                0, 0, 1, 1,
                this.mousePosElementX - temp1, this.mousePosElementY - temp1,
                temp0, temp0
            );
        } else {
            temp0 = this.state.optionbar.size[0] * this.tilePixelRatio;
            temp1 = temp0 / 2;

            if (this.state.optionbar.size[0] % 2 == 0)
                temp1 += this.tilePixelRatio / 2;

            temp2 = this.state.optionbar.size[1] * this.tilePixelRatio;
            temp3 = temp2 / 2;

            if (this.state.optionbar.size[1] % 2 == 0)
                temp3 += this.tilePixelRatio / 2;

            this.ctx.drawImage(
                this.brush,
                0, 0, 1, 1,
                this.mousePosElementX - temp1, this.mousePosElementY - temp3,
                temp0, temp2
            );
        }
    }
}

export default Main;