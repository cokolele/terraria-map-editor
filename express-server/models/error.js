const { dbQuery } = require("../configs/db.js");

const internalErrorHandler = (e) => {
    console.error(e);
    return false;
}

module.exports = {
    saveError: async (error) => {
        try {
            const insertError = await dbQuery(
                "INSERT INTO errors VALUES (0, ?, NOW())",
                [error]
            );

            return true;
        } catch (e) {
            return internalErrorHandler(e);
        }
    },
}