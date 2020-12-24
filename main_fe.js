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

var alarmArr;
var alarmTable = new Array(48);
for (var i = 0; i < 48; ++i) {
  alarmTable[i] = new Array();
}

function StartClock() {
  var curTime = new Date();
  if (parseInt(curTime.getMinutes()) % 30 === 0) {
    var idx = parseInt(curTime.hour) * 2;
    idx = curTime.minute === "00" ? idx : idx + 1;
  }
  timerId = setTimeout(StartClock, 60000);
}
StartClock();
 
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
  var cssPath = "/stylesheets/album_style.css";
  var body = template.album(pathList.length, pathList, cssPath);
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
});

function getAlarmTime(date) {
  var ret = [];
  var hour = date.getHours();
  var minute = date.getMinutes();
  console.log(hour, minute);
  if (minute >= 30 && minute < 60)
    minute = 30;
  else
    minute = 0;
  hour += 2 + Math.floor((minute + 30) / 60);
  hour = (hour) % 24;
  minute = (minute + 30) % 60;
  for (var i = 0; i < 8; ++i) {
    tmpHour = hour >= 0 && hour <= 9 ? "0" + hour : hour;
    tmpMinute = minute == 0 ? "0" + minute : minute;
    ret.push({hour:`${tmpHour}`, minute:`${tmpMinute}`});
    minute += 30
    if ((minute = minute % 60) == 0) {
      hour += 1;
    }
    hour %= 24;
  }
  return (ret);
}

app.get('/register', function(request, response) {
  var date = new Date();
  alarmArr = getAlarmTime(date);
  var cssPath = "/stylesheets/register_beverage_style.css";
  var head = template.category("/stylesheets/category_style.css", 4); 
  var body = template.register(cssPath, alarmArr, "beverage");
  var html = template.html(
    head,
    body,
    ""
  );
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

app.get('/capture', function(request, response) {
  var cssPath = "/stylesheets/register_etc_style.css";
  var head = template.category("/stylesheets/category_style.css", 4); 
  var body = `
  <video id="video" width="320" height="240" autoplay></video>
    <canvas id="canvas" width="960" height="720"></canvas>
    <button type="button" id="webcamBtn">캡쳐하기</button>
    <a id="download" download="myImage.jpg" href="/capture" onclick="download_img(this);">
      Download to myImage.jpg
    </a> 
    <script>
      download_img = function(el) {
        // get image URI from canvas object
        var imageURI = canvas.toDataURL("image/jpg");
        el.href = imageURI;
      };
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
              var video = document.getElementById('video');
              video.srcObject = stream;
              video.play();
          });
      }

      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var video = document.getElementById('video');
      document.getElementById("webcamBtn").addEventListener("click",function() {
          context.drawImage(video,0,0,960,720);
      });
    </script>
    
  `;
  var html = template.html(
    head,
    body
  );
  response.send(html);
})

function setAlarmTable(regTime, intraId) {
  var idx = parseInt(regTime.hour) * 2;
  console.log("regTime.minute:", regTime.minute);
  idx = regTime.minute === "00" ? idx : idx + 1;
  alarmTable[idx].push(intraId)
}

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

function genTimeForm(date, hour, minute) {
  console.log(date.getFullYear());
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate(); 
  if (hour == undefined)
    hour = date.getHours();
  if (minute == undefined)
    minute = date.getMinutes();
  return (`${year}-${month}-${day}-${hour}:${minute}:00`);
}

app.post('/register_beverage_post', function(request, response){
  var date = new Date();
  var intraId = request.body.intraId;
  var alarmNum = request.body.alarm;
  setAlarmTable(alarmArr[alarmNum], intraId);
  var alarmTime = getTimeForm(date, alarmArr[alarmNum].hour, alarmArr[alarmNum].minute);
  console.log(request.body);
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
  console.log(request.body['pngPath']);
  //var imgPath = genTimeForm(request.body['date']);
  response.send({data: "hihi"});
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});