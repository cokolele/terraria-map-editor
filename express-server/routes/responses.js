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
    internal_error: (res) => {
        res.status(500).json({
            status: "error",
            message: "API error: internal_error"
        });
    },
    default_bad_request: (res) => {
        res.status(400).json({
            status: "error",
            message: "API error: default_bad_request"
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