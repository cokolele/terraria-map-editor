const express = require("express");
const router = express.Router();

const responses = require("../responses.js");
const userModel = require("../../models/user.js");
const mapModel = require("../../models/map.js");

router.put("/password", async (req, res) => {
    if (req.body.oldPassword === undefined || req.body.newPassword === undefined) {
        responses.unprocessable(res, "missing parameters");
        return;
    }
    if (!req.session.loggedIn) {
        responses.unauthorized(res);
        return;
    }

    const retrievedUser = await userModel.getUserByCredentials(req.session.user.username, req.body.oldPassword);

    if (retrievedUser === false) {
        responses.internal_error(res);
        return;
    }
    if (retrievedUser.error) {
        responses.unprocessable(res, retrievedUser.error);
        return;
    }
    if (retrievedUser) {
        const changedPassword = await userModel.changeUserPassword(req.session.user.id, req.body.newPassword);

        if (changedPassword)
            responses.success(res, "password changed");
        else
            responses.internal_error(res);
        return;
    }

    responses.default_bad_request(res);
});

router.get("/maps", async (req, res) => {
    if (!req.session.loggedIn) {
        responses.unauthorized(res);
        return;
    }

    const retrievedMaps = await mapModel.getMaps(req.session.user.id);

    if (retrievedMaps === false) {
        responses.internal_error(res);
        return;
    }

    responses.successData(res, retrievedMaps);
});

router.post("/maps", async(req, res) => {
    if (!req.session.loggedIn) {
        responses.unauthorized(res);
        return;
    }
});

module.exports = router;