const { dbQuery } = require("../configs/db.js");
const terrariaWorldParser = require("../terraria-world-file-js-node/terraria-world-parser.js");
const { unlinkSync } = require("fs");

const internalErrorHandler = (e) => {
    console.error(e);
    return false;
}

module.exports = {
    verifyFile: (path) => {
        try {
            try {
                (new terrariaWorldParser(path)).parse(["fileformatheader", "footer"]);
            } catch (e) {
                if (e.name == "TerrariaWorldParserError")
                    return { error: "Wrong file format" };
                else
                    throw e;
            }

            return true;
        } catch(e) {
            return internalErrorHandler(e);
        }
    },
    saveMap: async (userId, path, name, size, uploadtime) => {
        try {
            const insertUser = await dbQuery(
                "INSERT INTO maps VALUES (0, ?, ?, ?, ?, ?);",
                [userId, path, name, size, uploadtime]
            );

            return true;
        } catch (e) {
            return internalErrorHandler(e);
        }
    },
    getMapsByUserId: async (userId) => {
        try {
            return await dbQuery(
                "SELECT id, name, size FROM maps WHERE id_account = ?",
                [userId]
            );
        } catch (e) {
            return internalErrorHandler(e);
        }
    },
    getMapById: async (id) => {
        try {
            return await dbQuery(
                "SELECT * FROM maps WHERE id = ?",
                [id]
            );
        } catch (e) {
            return internalErrorHandler(e);
        }
    },
    deleteMap: async (map) => {
        try {
            return await dbQuery(
                "DELETE FROM maps WHERE id = ?",
                [map.id],
                function() {
                    unlinkSync(map.path);
                }
            );
        } catch (e) {
            return internalErrorHandler(e);
        }
    }
    /*changeUserPassword: async (id, newPassword) => {
        try {
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(newPassword, 8, function(err, hash) {
                    if (err) reject(err);
                    resolve(hash);
                });
            });

            const updatePassword = await dbQuery(
                "UPDATE `accounts` SET `password` = ? WHERE `accounts`.`id` = ?;",
                [hashedPassword, id]
            );

            return true
        } catch (e) {
            return internalErrorHandler(e);
        }
    }*/
}