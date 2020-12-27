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
var moveFile = require('./lib/move_file.js');
var manageTime = require('./lib/manage_time.js');
var pngPath;

var alarmArr;
var alarmTable = new Array(48);
for (var i = 0; i < 48; ++i) {
  alarmTable[i] = new Array();
};

/*
function sendAlarm() {
  var curTime = new Date();
  if (parseInt(curTime.getMinutes()) % 30 === 0) {
      console.log("====================303030===================");
      var idx = parseInt(curTime.hour) * 2;
      idx = curTime.minute === "00" ? idx : idx + 1;
  }
  console.log("hihi");
  timerId = setTimeout(sendAlarm, 6000);
}
*/
manageTime.sendAlarm();
 
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

pathList = [];
/*
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'5933',
  database:'42_oasis'
});
db.connect();


db.query(`select * from beverage`, function(error, topics){
  if (error) console.log(error);
  for (var i = 0; i < topics.length; i++)
    pathList.push(topics[i]);
}); 
*/

app.get('/', function(request, response) { 
  var head = template.category("/stylesheets/category_style.css", 0); 
  var body = template.info("/images/oasis.jpg");
  //var html = template.html("", body, "");
  var html = template.html(
    head,
    body,
    ""
  );
  response.send(html);
});

pathList.push("20201127183323");
pathList.push("20201127183744");
pathList.push("20201127184010");
pathList.push("20201127184022");
// 삭제 버튼을 누를 때, status를 변경하여 숨김 status인 애는 띄우지 않기.
app.get('/beverage', function(request, response) {
  var cssPath = "/stylesheets/album_style.css";
  var head = template.category("/stylesheets/category_style.css", 1); 
  var body = template.album(pathList, cssPath);
  var html = template.html(
    head,
    body,
    ""
  );
  response.send(html);
});

app.get('/register', function(request, response) {
  var date = new Date();
  alarmArr = manageTime.genAlarmArr(date);
  var cssPath = "/stylesheets/register_beverage_style.css";
  var head = template.category("/stylesheets/category_style.css", 4); 
  var body = template.register(cssPath, alarmArr, "beverage");
  var html = template.html(
    head,
    body,
    ""
  );
  moveFile.move2Trash(__dirname);
  response.send(html);
})

app.get('/register/snack', function(request, response) {
  var cssPath = "/stylesheets/register_snack_style.css";
  var head = template.category("/stylesheets/category_style.css", 4); 
  var body = template.register(cssPath, alarmArr, "snack");
  var html = template.html(
    head,
    body
  );
  response.send(html);
})

app.get('/register/etc', function(request, response) {
  var cssPath = "/stylesheets/register_etc_style.css";
  var head = template.category("/stylesheets/category_style.css", 4); 
  var body = template.register(cssPath, alarmArr, "etc");
  var html = template.html(
    head,
    body
  );
  response.send(html);
})

function insertDB(category, intraId, alarmTime, message, notification) {
  var date = new Date();
  var currentTime = 1900 + date.getYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); 
  if (category == 1) {
    db.query(`insert into beverage(intra_id, register_time, alarm_time) values(?, ?, ?)`, [intraId, currentTime, alarmTime], function(error){
      if (error) console.log(error);
    });
  }
  else if (category == 2) {
    db.query(`insert into snack(intra_id, register_time, message, alarm_check) values(?, ?, ?, ?)`,[intraId, currentTime, message, notification], function(error){
      if (error) console.log(error);
    });
  }
  else if (category == 3) {
    db.query(`insert into needs(intra_id, register_time, message, alarm_check) values(?, ?, ?, ?)`,[intraId, currentTime, message, notification], function(error){
      if (error) console.log(error);
    });
  }
}



app.post('/register_beverage_post', function(request, response){
  var date = new Date();
  var intraId = request.body.intraId;
  var alarmNum = request.body.alarm;
  //manageTime.setAlarmTable(alarmTable, alarmArr[alarmNum], intraId);
  var alarmTime = manageTime.getTimeForm(date, alarmArr[alarmNum].hour, alarmArr[alarmNum].minute);
  moveFile.move2Save(__dirname, pngPath);
  //insertDB(1, intraId, alarmTime, '', '')
  response.redirect(`/register`);
  response.end();
});

app.post('/register_snack_post', function(request, response){
  var intraId = request.body.intraId;
  var message = request.body.message;
  var notification = request.body.notification;
  //insertDB(2, intraId, '', message, notification)
  response.redirect(`/register/snack`);
  response.end();
});

app.post('/register_etc_post', function(request, response){
  var intraId = request.body.intraId;
  var message = request.body.message;
  var notification = request.body.notification;
  insertDB(3, intraId, '', message, notification)
  response.redirect(`/register/etc`);
  response.end();
});

app.post('/test', (request, response) => {
  console.log('server received /test');
  pngPath = request.body['pngPath'];
  console.log(pngPath);
  response.send({data: "hihi"});
});

app.post('/album_delete', (request, response) => {
  var idx = request.body['idx'];
  var status = request.body['status'];
  console.log(idx, status);
  response.send({data: "hidelete"});
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
