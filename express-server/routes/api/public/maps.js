const express = require("express");
const router = express.Router();

const responses = require("../../responses.js");
const mapModel = require("../../../models/map.js");

router.get("/example", async (req, res) => {
    const filePath = req.app.get("content") + "example.wld";
    responses.successFile(res, filePath);
});

module.exports = router;
