'use strict';
var http = require('http');
const port = 3000;
var server = http.createServer(function (request, response) {
    console.log(request.method + ': ' + request.url);
    response.writeHead(200, {'Content-type': 'text/html'});
    response.end('<h1>Hello world!</h1>');
});

server.listen(port);

console.log(`Server is running at http://127.0.0.1:${port}/`);