"use strict";
exports.__esModule = true;
// Setup basic express server
var express = require("express");
var app = express();
// var path = require('path');
// var fs = require('fs');
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
    response.sendFile('/app/views/index.html');
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ', listener.address());
});
// app.post('/nodes', function(request, respond) {
//   var body = '';
//   var filePath = __dirname + '/.data/data.json';
//   request.on('data', function(data) {
//     body += data;
//   });
//   request.on('end', function (){
//     fs.writeFile(filePath, body, function() {
//       respond.end();
//     });
//   });
// });
// app.get('/nodes', function(req, res) {
//   res.sendFile(path.join(__dirname, '/.data/data.json'));
// });
//# sourceMappingURL=server.js.map