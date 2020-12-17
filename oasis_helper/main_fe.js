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
  user:'root',
  password:'5933',
  database:'42_oasis'
});
db.connect();

pathList = [];

db.query(`select * from beverage`, function(error, topics){
  if (error) console.log(error);
  for (var i = 0; i < topics.length; i++)
    pathList.push(topics[i]);
}); 
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
  var cssPath = "/stylesheets/album_style.css";
  var body = template.album(pathList.length, pathList, cssPath);
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
});

app.get('/register', function(request, response) {
  var cssPath = "/stylesheets/register_style.css";
  var body = template.register(cssPath);
  /*
  var body = `
  <form action="/register_process" method="post">
   
    <select class="category" name="category">
      <option name="beverage" value="1">음료</option>
      <option name="snack" value="2">간식</option>
      <option name="etc" value="3">비품</option>
    </select>
    <p><button id='button1'> <a href=/beverage>음료</a> </button></p>
    <p><input type="text" name="intraId" placeholder="intra ID"></p>
    <p><textarea name="message" placeholder="message"></textarea></p>
    <p><input type="submit" value="등록"></p>
    <p><input type="submit" value="취소"></p>
  </form>
  `;
  */
  
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
})

app.post('/register_process', function(request, response){
  var category = request.body.category;
  var intraId = request.body.intraId;
  var message = request.body.message;
  console.log(category, intraId, message);
  response.redirect(`/register`);
  response.end();
});

/*
$('#button1').click(function(){
  console.log('button clicked');
  $.ajax({url: 'test1', success:function(res){
      console.log('server response is', res);
  }});
});

app.get("/test1", function (request, response) {
  response.send('ok');
});
*/

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});