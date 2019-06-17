"use strict";
exports.__esModule = true;
// Setup basic express server
var express = require("express");
var app = express();
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
    response.sendFile('/app/views/index.html');
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ', listener.address());
});

//# sourceMappingURL=server.js.map