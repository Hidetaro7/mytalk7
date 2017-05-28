/*
 * hello, world
 * IPなど設定：http://testcording.com/?p=1164
 */

/*var http = require("http");
http.createServer(function (req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("hello, Chikuwa!!!!\n");
}).listen(process.env.PORT || 8000);

*/

var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var port = process.env.PORT || 8000;
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var json = {
	mydata: [
		{"name": "鈴木", "comment": "Hello"},
		{"name": "大田", "comment": "World"}
	]
}
app.use(express.static(__dirname + '/public'));
// CORSを許可する
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});
*/
app.get('/', (req, res) => {
	//res.send('hello');
	//res.end(JSON.stringify(json));
	res.header('Content-Type', 'text/html; charset=utf-8');
	res.sendfile('index.html');
});


app.post('/phrase', (req, res) => {
	var phrase = req.body.phrase;
	console.log("きてる")
	console.log(phrase)
	var url = "https://jlp.yahooapis.jp/KeyphraseService/V1/extract?output=json&appid=dj0zaiZpPTROdVpkbk9hTUduQyZzPWNvbnN1bWVyc2VjcmV0Jng9ODY-&sentence="+phrase;
	var options = {
	  url: url,
	  method: 'GET'/*,
	  headers: headers,
	  json: true,
	  form: {"hoge":"fuga"}*/
	}
	request(options, function (error, response, body) {
	  //コールバックで色々な処理
	  if(error) {
	  	console.log(error);
	  	return;
	  }
	  console.log(body);
	  res.end(response);
	})
	//console.log(req.body)
	//res.end(JSON.stringify(req.body));
});

app.listen(port);