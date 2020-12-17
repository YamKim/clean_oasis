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

var db = mysql.createConnection({
  host:'localhost',
  user:'nodejs',
  password:'1111',
  database:'42_oasis'
});
db.connect();

pathList = [];

db.query(`select * from beverage`, function(error, topics){
  if (error) console.log(error);
  for (let i = 0; i < topics.length; i++)
    pathList.push(topics[i]);
}); 

app.get('/', function(request, response) { 
  //var cssPath = "/stylesheets/style.css";
  //var body = template.grid(cssPath);
  //var html = template.html("", body, "");
  for (let i = 0; i < pathList.length; i++) {
    var body = `
    <img src=/images/${pathList[i].intra_id}.png>
    `
    var html = template.html(
      "",
      body,
      ""
    );
  }
  response.send(html);
});

app.get('/register/:registerId', function(request, response) {
  console.log(request.params);
})
 
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});