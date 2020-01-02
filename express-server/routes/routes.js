const express = require("express");
const rootRouter = express.Router();

const apiRoute = require("./api/index.js");

rootRouter.use("/api", apiRoute)

module.exports = rootRouter;