const bcrypt = require("bcrypt");
const { dbQuery } = require("../configs/db.js");

const internalErrorHandler = (e) => {
    console.error(e);
    return false;
}

module.exports = {
    saveUser: async (username, password, email) => {
        try {
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(password, 8, function(err, hash) {
                    if (err) reject(err);
                    resolve(hash);
                });
            });

            const sameCredentialsUsers = await dbQuery(
                "SELECT * FROM `accounts` WHERE `username` = ? OR `email` = ?",
                [username, email]
            )

            if (sameCredentialsUsers.length > 1 || (sameCredentialsUsers.length === 1 && username === sameCredentialsUsers[0].username && email === sameCredentialsUsers[0].email))
                return { error: "Username and email taken" };
            else if (sameCredentialsUsers.length === 1)
                return { error: username === sameCredentialsUsers[0].username ? "Username taken" : "Email taken" };

            const insertUser = await dbQuery(
                "INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES ('0', ?, ?, ?);",
                [username, hashedPassword, email]
            );

            return true;
        } catch (e) {
            return internalErrorHandler(e);
        }
    },
    getUserByCredentials: async (username, password) => {
        try {
            const sameUsernameUser = await dbQuery(
                "SELECT * FROM `accounts` WHERE `username` = ?",
                [username]
            );

            if (sameUsernameUser.length === 0)
                return { error: "No user found" };

            const passwordsMatch = await new Promise((resolve, reject) => {
                bcrypt.compare(password, sameUsernameUser[0].password, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            if (!passwordsMatch)
                return { error: "Wrong password" };
            else
                return sameUsernameUser;
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
    }
}