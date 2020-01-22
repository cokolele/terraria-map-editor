const express = require("express");
const router = express.Router();

const responses = require("../responses.js");
const userModel = require("../../models/user.js");

const passwordRouter = require("./account/password.js");
const mapsRouter = require("./account/maps.js");

router.use("/maps", mapsRouter);
router.use("/maps", passwordRouter);

module.exports = router;