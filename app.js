'use strict';
const http = require("http");
const router = require("./router");

http.createServer((request, response) => {
    router.home(request, response);
    router.user(request, response);
}).listen(8000, "127.0.0.1");
console.log("Server running: localhost:8000")