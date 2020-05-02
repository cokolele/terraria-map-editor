const express = require("express");
const router = express.Router();

const responses = require("../responses.js");

const mapsRouter = require("./public/maps.js");

router.use("/maps", mapsRouter);

module.exports = router;
