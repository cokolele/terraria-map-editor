const express = require("express");
const apiRouter = express.Router();

const sessionRouter = require("./session.js");
const accountRouter = require("./account.js");
const publicRouter = require("./public.js");

apiRouter.use((req, res, next) => {
    res.type("application/json");
    next();
})

apiRouter.use("/session", sessionRouter);
apiRouter.use("/account", accountRouter);
apiRouter.use("/public", publicRouter);

apiRouter.use("//", (req, res) => {
    res.json({
        status: "ok",
        message: "api running"
    });
});

apiRouter.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "endpoint or method not found"
    });
})

module.exports = apiRouter;
