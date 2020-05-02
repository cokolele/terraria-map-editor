const express = require("express");
const router = express.Router();

const responses = require("../../responses.js");
const mapModel = require("../../../models/map.js");

const crypto = require("crypto");
const { unlinkSync, existsSync, mkdirSync } = require("fs");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const mapsDir = req.app.get("content") + "maps/";
        if (!existsSync(mapsDir))
            mkdirSync(mapsDir);

        cb(null, mapsDir);
    },

    filename: (req, file, cb) => {
        file.id = crypto.randomBytes(20).toString('hex');
        cb(null, file.id);
    }
});

const mapFilter = (req, file, cb) => {
    if (!file.originalname.includes(".wld") || file.encoding != "7bit" || file.mimetype != "application/octet-stream") {
        cb({ name: "FilterError", message: "Wrong file format" }, false);
        return;
    }

    cb(null, true);
};

const mapUpload = multer({ storage: storage, fileFilter: mapFilter, limits: { fileSize: 20971520 } });

router.post("/", async (req, res) => {
    if (!req.session.loggedIn) {
        responses.unauthorized(res);
        return;
    }

    let upload = mapUpload.single("map");

    upload(req, res, (err) => {
        if (err) {
            if (err.name == "FilterError" || err.name == "MulterError") {
                if (err.code == "LIMIT_FILE_SIZE")
                    err.message = "File exceeded size limit (20 MB)";

                responses.unprocessable(res, err.message);
                return;
            }

            console.error(err);
            responses.internal_error(res);
            return;
        }

        const validFile = mapModel.verifyFile(req.file.path);

        if (validFile === false) {
            responses.internal_error(res);
            unlinkSync(req.file.path);
            return;
        }
        if (validFile.error) {
            responses.unprocessable(res, validFile.error);
            unlinkSync(req.file.path);
            return;
        }

        const saveMap = mapModel.saveMap(req.session.user.id, req.file.path, req.file.originalname, req.file.size, Date.now());
        if (saveMap === false) {
            responses.internal_error(res);
            return;
        }

        if (saveMap) {
            responses.success(res, "Map saved");
            return;
        }

        responses.default_bad_request(res);
    });
});

router.get("/", async (req, res) => {
    if (!req.session.loggedIn) {
        responses.unauthorized(res);
        return;
    }

    const retrievedMaps = await mapModel.getMapsByUserId(req.session.user.id);

    if (retrievedMaps === false) {
        responses.internal_error(res);
        return;
    }

    if (retrievedMaps) {
        responses.successData(res, retrievedMaps);
        return;
    }

    responses.default_bad_request(res);
});

router.get("/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        responses.unauthorized(res);
        return;
    }

    const map = await mapModel.getMapById(req.params.id);

    if (map === false) {
        responses.internal_error(res);
        return;
    }

    if (map[0].id_account != req.session.user.id) {
        responses.unprocessable(res, "Permission denied");
        return;
    }

    responses.successFile(res, map[0].path);
});

router.delete("/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        responses.unauthorized(res);
        return;
    }

    const map = await mapModel.getMapById(req.params.id);

    if (map === false) {
        responses.internal_error(res);
        return;
    }

    if (map[0].id_account != req.session.user.id) {
        responses.unprocessable(res, "Permission denied");
        return;
    }

    const mapDeleted = await mapModel.deleteMap(map[0]);

    if (mapDeleted === false) {
        responses.internal_error(res);
        return;
    }

    if (mapDeleted) {
        responses.success(res, "Map deleted");
        return;
    }

    responses.default_bad_request(res);
})

module.exports = router;