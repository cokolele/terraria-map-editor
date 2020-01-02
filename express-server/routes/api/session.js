const express = require("express");
const router = express.Router();
const isemail = require("isemail");

const responses = require("../responses.js");
const userModel = require("../../models/user.js");

const usernameRegexp = /^[a-z0-9_-]{3,16}$/;

router.get("//", (req, res) => {
    if (req.session.loggedIn) {
        responses.success(res, "logged in", { user: req.session.user });
        return;
    } else {
        responses.unauthorized(res);
        return;
    }

    responses.default_bad_request(res);
});

router.post("/login", async (req, res) => {
    if (req.session.loggedIn) {
        responses.success(res, "logged in");
        return;
    }

    if (req.body.username === undefined || req.body.password === undefined) {
        responses.unprocessable(res, "missing parameters");
        return;
    }
    if (req.body.username.trim().length === 0 || !usernameRegexp.test(req.body.username)) {
        responses.unprocessable(res, "invalid username");
        return;
    }
    if (req.body.password.trim().length === 0 || req.body.password.length > 55) {
        responses.unprocessable(res, "invalid password");
        return;
    }

    const getUser = await userModel.getUserByCredentials(req.body.username, req.body.password);

    if (getUser === false) {
        responses.internal_error(res);
        return;
    }
    if (getUser.error) {
        responses.unprocessable(res, getUser.error);
        return;
    }
    if (getUser) {
        req.session.loggedIn = true;
        req.session.user = {
            id: getUser[0].id,
            username: getUser[0].username,
            email: getUser[0].email
        },
        responses.success(res, "logged in");
        return;
    }

    responses.default_bad_request(res);
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        delete req.session.user;
        req.session.loggedIn = false;
        responses.success(res, "logged out");
        return;
    } else {
        responses.unauthorized(res);
        return;
    }

    responses.default_bad_request(res);
});

router.post("/register", async (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined || req.body.email === undefined) {
        responses.unprocessable(res, "missing parameters");
        return;
    }
    if (req.body.username.trim().length === 0 || !usernameRegexp.test(req.body.username)) {
        responses.unprocessable(res, "invalid username");
        return;
    }
    if (req.body.password.trim().length === 0 || req.body.password.length > 55) {
        responses.unprocessable(res, "invalid password");
        return;
    }
    if (!isemail.validate(req.body.email)) {
        responses.unprocessable(res, "invalid email");
        return;
    }

    const userSaved = await userModel.saveUser(req.body.username, req.body.password, req.body.email);

    if (userSaved === false) {
        responses.internal_error(res);
        return;
    }
    if (userSaved.error) {
        responses.unprocessable(res, userSaved.error);
        return;
    }
    if (userSaved) {
        responses.success(res, "registered");
        return;
    }

    responses.default_bad_request(res);
});

module.exports = router;