import { ToolMoveIcon, ToolTileInfo, ToolSelectIcon, ToolPencilIcon, ToolBucketIcon, ToolEraserIcon, ToolPointIcon } from "/components/icon.jsx";

export default {
    move: {
        title: "Move (hand) tool",
        icon: ToolMoveIcon
    },/*
    tileInfo: {
        title: "Tile info tool",
        icon: ToolTileInfo
    },*/
    pencil: {
        title: "Pencil tool",
        icon: ToolPencilIcon,
        stroke: true
    },/*
    select: {
        title: "Rectangle select tool",
        icon: ToolSelectIcon,
    },*//*
    bucket: {
        title: "Paint bucket tool",
        icon: ToolBucketIcon,
        stroke: true
    },*/
    eraser: {
        title: "Eraser tool",
        icon: ToolEraserIcon
    },
    worldPoint: {
        title: "World point tool",
        icon: ToolPointIcon
    }
};