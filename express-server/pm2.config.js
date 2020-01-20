const config = require("./configs/profiles/config.js");

module.exports = {
    apps : [
        {
            name: "express_api",
            cwd: config.cwd,
            script: "./server.js",
            error_file: "./logs/server-error.log",
            out_file: "./logs/server-out.log",
            log_file: "./logs/server-combined.log",
            time: true,
            watch: ["./models/", "./routes/", "./configs/"],
            env: {
                "NODE_ENV": "development"
            },
            env_production: {
                "NODE_ENV": "production",
            },
        }
    ]
}
