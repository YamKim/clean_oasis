var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');
var sanitizeHtml = require('sanitize-html');
var compression = require('compression')
var template = require('./lib/template.js');
var mysql = require('mysql2/promise');
var moveFile = require('./lib/move_file.js');
var manageTime = require('./lib/manage_time.js');
var pngPath;

var alarmArr;
// manageTime.alarmTable = new Array(48);
// for (var i = 0; i < 48; i++) {
//   manageTime.alarmTable[i] = new Array();
// }

var alarmTable = new Array(48);
for (var i = 0; i < 48; ++i) {
  alarmTable[i] = new Array();
};

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

var db = mysql.createPool({
  host:'localhost',
  user:'nodejs',
  password:'1111',
  database:'42_oasis'
});

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

app.get('/beverage', function(request, response) {
  const dbTest = async () => {
    try {
      const connection = await db.getConnection(async conn => conn);
      try {
        [rows] = await connection.query(`select * from beverage where status = 1`);
        connection.release();
        var head = template.category("/stylesheets/category_style.css", 1);
        var body = template.album(rows, "/stylesheets/album_style.css");
        var html = template.html(
          head,
          body,
          ""
        );
        response.send(html);
        return rows;
      } catch(err) { 
        console.log('Query Error');
        connection.release();
        return false;
      }
    } catch(err) {
      console.log('DB Error');
      return false;
    }
  };
  dbTest.call();
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
  var tmp = path.basename(pngPath, '.png');
  tmp = parseInt(tmp);
  if (category == 1) {
    db.query(`insert into beverage(intra_id, register_time, alarm_time) values(?, ?, ?)`, [intraId, tmp, alarmTime], function(error){
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
  // manageTime.setAlarmTable(manageTime.alarmTable, alarmArr[alarmNum], intraId);
  manageTime.setAlarmTable(alarmTable, alarmArr[alarmNum], intraId);
  console.log(alarmTable);
  var alarmTime = manageTime.getTimeForm(date, alarmArr[alarmNum].hour, alarmArr[alarmNum].minute);
  moveFile.move2Save(__dirname, pngPath);
  insertDB(1, intraId, alarmTime, '', '');
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
  // console.log(pngPath);
  response.send({data: "hihi"});
});

app.post('/album_delete', (request, response) => {
  var idx = request.body['idx'];
  var status = request.body['status'];
  console.log(idx, status);
  db.query(`update beverage set status = 2 where id = ?`, [idx]);
  // response.send({data: "hidelete"});
  response.send(`/register`);
  // response.redirect(`/register`);
  // response.end();
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
