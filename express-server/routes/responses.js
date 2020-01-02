module.exports = {
    success: (res, msg, data) => {
        res.json({
            ...({
                status: "ok",
                message: msg
            }),
            ...data
        });
    },
    internal_error: (res) => {
        res.status(500).json({
            status: "error",
            message: "database query error"
        });
    },
    default_bad_request: (res) => {
        res.status(400).json({
            status: "error",
            message: null
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
            message: "not logged in"
        })
    }
}