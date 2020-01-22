const express = require("express");
const router = express.Router();

const responses = require("../../responses.js");
const userModel = require("../../../models/user.js");

router.put("/", async (req, res) => {
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

module.exports = router;