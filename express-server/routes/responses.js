module.exports = {
    success: (res, msg, data) => {
        res.json({
            status: "ok",
            message: msg,
            ...data
        });
    },
    successData: (res, data) => {
        res.json(data);
    },
    successFile: (res, path) => {
        res.sendFile(path, { maxAge: 2592000000, headers: { "Content-Type": "application/octet-stream" } });
    },
    internal_error: (res) => {
        res.status(500).json({
            status: "error",
            message: "Unexpected server error"
        });
    },
    default_bad_request: (res) => {
        res.status(400).json({
            status: "error",
            message: "Default bad request"
        });
    },
    unprocessable: (res, msg) => {
        res.status(422).json({
            status: "error",
            message: msg
        });
    },
    unauthorized: (res) => {
        res.status(401).json({
            status: "error",
            message: "Not logged in"
        })
    }
}