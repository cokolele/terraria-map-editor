import "src/utils/polyfills/polyfill-requestAnimationFrame.js";

import store from "src/state/store.js";
import { stateChange } from "src/state/state.js";

import LAYERS from "src/utils/dbs/LAYERS.js";
import sprite, { NPCsSprites, WorldPointsSprites } from "src/utils/dbs/sprites.js";

import extensions from "src/canvas/extensions/index.js";
import workerInterfaces from "src/canvas/workerInterfaces/main/index.js";

import listenerWrapper from "src/canvas/listeners/listenerWrapper.js";
import onCanvasClick from "src/canvas/listeners/click.js";
import onCanvasMouseMove from "src/canvas/listeners/mousemove.js";
import onCanvasTouchMove from "src/canvas/listeners/touchmove.js";
import onCanvasWheel from "src/canvas/listeners/wheel.js";
import onCanvasTouchStart from "src/canvas/listeners/touchstart.js";
import onCanvasTouchEnd from "src/canvas/listeners/touchend.js";
import onCanvasMouseDown from "src/canvas/listeners/mousedown.js";
import onCanvasMouseUp from "src/canvas/listeners/mouseup.js";
import onCanvasMouseOver from "src/canvas/listeners/mouseover.js";
import onCanvasMouseLeave from "src/canvas/listeners/mouseleave.js";

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
        this.worker = new Worker(new URL("./worker.js", import.meta.url));
    }

    this.init = (canvasEl) => {
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext("2d");
        this.resetWorker();
        this.initListeners();
    }

    this.initListeners = () => {
            this.canvas.addEventListener("click", listenerWrapper(onCanvasClick));
            this.canvas.addEventListener("wheel", listenerWrapper(onCanvasWheel));
            this.canvas.addEventListener("mousedown", listenerWrapper(onCanvasMouseDown));
            this.canvas.addEventListener("mouseup", listenerWrapper(onCanvasMouseUp));
            this.canvas.addEventListener("mousemove", listenerWrapper(onCanvasMouseMove));
            this.canvas.addEventListener("mouseover", listenerWrapper(onCanvasMouseOver));
            this.canvas.addEventListener("mouseleave", listenerWrapper(onCanvasMouseLeave));

            this.canvas.addEventListener("touchmove", listenerWrapper(onCanvasTouchMove));
            this.canvas.addEventListener("touchstart", listenerWrapper(onCanvasTouchStart));
            this.canvas.addEventListener("touchend", listenerWrapper(onCanvasTouchEnd));
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
        for (let i = this.state.canvas.worldObject.header.maxTilesY; i > 10; i = Math.ceil(i * 0.7))
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

        switch (this.state.toolbar.tool) {
            case "pencil":
            case "eraser":
                this.loop.drawBrush();
                break;
            case "worldPoint":
                this.loop.drawLocation();
                break;
        }

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
        if (this.listeners.moveMomentum && this.listeners.noTouches) {
            this.listeners.moveMomentum.x *= 0.86;
            this.listeners.moveMomentum.y *= 0.86;
            this.posX -= this.listeners.moveMomentum.x / this.tilePixelRatio;
            this.posY -= this.listeners.moveMomentum.y / this.tilePixelRatio;
        }

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

        if (this.state.layersVisibility.WorldPoints) {
            temp1 = WorldPointsSprites.dungeon[2] * ( 2 + this.zoomLevel * 0.2 );
            temp2 = WorldPointsSprites.dungeon[3] * ( 2 + this.zoomLevel * 0.2 );

            this.ctx.drawImage(sprite,
                WorldPointsSprites.dungeon[0], WorldPointsSprites.dungeon[1], WorldPointsSprites.dungeon[2], WorldPointsSprites.dungeon[3],
                this.state.canvas.worldObject.header.dungeonX * this.tilePixelRatio - this.posX * this.tilePixelRatio - temp1 / 2 + this.tilePixelRatio / 2, this.state.canvas.worldObject.header.dungeonY * this.tilePixelRatio - this.posY * this.tilePixelRatio - temp2, temp1, temp2);

            temp1 = WorldPointsSprites.spawn[2] * ( 2 + this.zoomLevel * 0.2 );
            temp2 = WorldPointsSprites.spawn[3] * ( 2 + this.zoomLevel * 0.2 );

            this.ctx.drawImage(sprite,
                WorldPointsSprites.spawn[0], WorldPointsSprites.spawn[1], WorldPointsSprites.spawn[2], WorldPointsSprites.spawn[3],
                this.state.canvas.worldObject.header.spawnTileX * this.tilePixelRatio - this.posX * this.tilePixelRatio - temp1 / 2 + this.tilePixelRatio / 2, this.state.canvas.worldObject.header.spawnTileY * this.tilePixelRatio - this.posY * this.tilePixelRatio - temp2, temp1, temp2);
        }

        if (this.state.canvas.worldObject.NPCs && this.state.layersVisibility.NPCs)
            this.state.canvas.worldObject.NPCs.forEach(npc => {
                if (!NPCsSprites[npc.id])
                    temp0 = NPCsSprites.unknown;
                else if (npc.variationIndex !== undefined && typeof NPCsSprites[npc.id][npc.variationIndex] == "object")
                    temp0 = NPCsSprites[npc.id][npc.variationIndex];
                else
                    temp0 = NPCsSprites[npc.id];

                temp1 = temp0[2] * ( 2 + this.zoomLevel * 0.2 );
                temp2 = temp0[3] * ( 2 + this.zoomLevel * 0.2 );

                if (npc.homePosition)
                    this.ctx.drawImage(sprite,
                        temp0[0], temp0[1], temp0[2], temp0[3],
                        npc.homePosition.x * this.tilePixelRatio - this.posX * this.tilePixelRatio - temp1 / 2 + this.tilePixelRatio / 2,npc.homePosition.y * this.tilePixelRatio - this.posY * this.tilePixelRatio - temp2,temp1, temp2);
                else
                    this.ctx.drawImage(sprite,
                        temp0[0], temp0[1], temp0[2], temp0[3],
                        (npc.position.x / 16) * this.tilePixelRatio - this.posX * this.tilePixelRatio - temp1 / 2 + this.tilePixelRatio / 2, (npc.position.y / 16) * this.tilePixelRatio - this.posY * this.tilePixelRatio - temp2, temp1, temp2);
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

    this.loop.drawLocation = () => {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#ff0000";
        this.ctx.translate(0.5, 0.5);
        this.ctx.moveTo(Main.mousePosElementX, 0);
        this.ctx.lineTo(Main.mousePosElementX, Main.canvas.clientHeight);
        this.ctx.stroke();
        this.ctx.moveTo(0, Main.mousePosElementY);
        this.ctx.lineTo(Main.canvas.clientWidth, Main.mousePosElementY);
        this.ctx.stroke();
    }
}

export default Main;