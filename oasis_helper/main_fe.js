var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');
var sanitizeHtml = require('sanitize-html');
var compression = require('compression')
var template = require('./lib/template.js');
var mysql = require('mysql');
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

/*
var db = mysql.createConnection({
  host:'localhost',
  user:'nodejs',
  password:'1111',
  database:'opentutorials'
});
db.connect();
var imgPath = "/images/";
db.query(`SELECT title FROM topic where id = 2`, function(error, topics){
  imgPath += topics[0].title
  imgPath += ".png";
}); 
console.log(imgPath);
*/

app.get('/', function(request, response) { 
  var cssPath = "/stylesheets/info_style.css";
  var body = template.info(cssPath, "/images/info.png");
  //var html = template.html("", body, "");
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
});

app.get('/beverage', function(request, response) { 
  //var cssPath = "/stylesheets/register_style.css";
  //var body = template.grid(cssPath, button);
  var body = `
  <form action="/beverage">
    <input type="text">
    <input type="submit" value="전송">
    <input type="button" value="버튼" onclick="console.log(5)">
    <input type="reset">
  </form>
  `
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
});

app.get('/register/:registerId', function(request, response) {
  console.log(request.params);
})
 
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});