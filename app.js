/*
 * hello, world
 * IPなど設定：http://testcording.com/?p=1164
 */

var http = require("http");
http.createServer(function (req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("hello, Chikuwa!!!!\n");
}).listen(1337, "localhost");