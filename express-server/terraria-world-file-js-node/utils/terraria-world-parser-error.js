module.exports = function TerrariaWorldParserError(msg, err) {
    console.error("\nTerrariaWorldParserError: " + msg);
    err.name = "TerrariaWorldParserError";
    err.message = msg;
    return err;
}