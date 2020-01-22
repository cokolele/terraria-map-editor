module.exports = function TerrariaWorldParserError(msg, err) {
    err.name = "TerrariaWorldParserError";
    err.message = msg;
    return err;
}