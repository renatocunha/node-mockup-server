"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var port = 9000;
/**
 * Starts the mockup server listening at port 9000
 * TO-DO - make port variable
 */
app_1["default"].listen(port, function (err) {
    if (err) {
        return console.error(err);
    }
    return console.log("// listening on port: " + port + "  //");
});
