const { dbQuery } = require("../configs/db.js");
const terrariaWorldParser = require("../terraria-world-file-js-node/terraria-world-parser.js");
const { fs } = require("fs");

const internalErrorHandler = (e) => {
    console.error(e);
    return false;
}

module.exports = {
    getMaps: async (userId) => {
        try {
            return await dbQuery(
                "SELECT filepath FROM maps WHERE id_account = ?",
                [userId]
            );
        } catch (e) {
            return internalErrorHandler(e);
        }
    },/*
    saveMap: async (userId, file) => {
        try {
            try {
                (new terrariaWorldParser(file)).parse("fileformatheader");
            } catch (e) {
                if (e.name == "TerrariaWorldParserError")
                    return { error: "Wrong file format" };
                else
                    throw e;
            }

            if (file.length > 20mb)
                return { error: "File size exceeding limit (20MB)" };

            const insertUser = await dbQuery(
                "INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES ('0', ?, ?, ?);",
                [username, hashedPassword, email]
            );

            return true;
        } catch (e) {
            return internalErrorHandler(e);
        }
    },
    changeUserPassword: async (id, newPassword) => {
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