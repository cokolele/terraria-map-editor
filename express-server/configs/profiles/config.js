const env = process.env.NODE_ENV || "development";
const envConfig = require("./" + env + ".js");

module.exports = {
    ...envConfig,
    env
};