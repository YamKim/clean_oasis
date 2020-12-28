const nodemailer = require('nodemailer');
var intra_id = 'jlee';

function sendMail(intra_id) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: '42cleanoasis@gmail.com',
            clientId: '108634353751-1f9eiil97p6lad29bnqd9djh77hrgal9.apps.googleusercontent.com',
            clientSecret: 'kj1jDDot7mUio_ebFdwOnSMN',
            refreshToken: '1//04YPKWE2thn9MCgYIARAAGAQSNwF-L9Irkwn3wk9QWchulTDq7qJsOkXyPyyb3gMMdyfDPM0Ldx5QkURARib043NefsuyAiSC9mM',
            accessToken: 'ya29.a0AfH6SMDOogEYQL8xCt7PlPVZbR7ShaTvzEIv63TQ23sPAJu4UbZRIRl9M05ZLY1coL1q9WmKAYpXoDKR0A5Pl_j7gIfZ4_smxrf0BwLLWypoiKzplQ_Tdr5SwTd08-ixuezJCzYUosi9uRGs2c8vrNba6mf55ZPJ1St0ZxcPGoY',
            expires: 3600
        }
    });
    let mailOptions = {
        from:{
            name: '42 Clean Oasis',
            address: '42cleanoasis@gmail.com'
        },
        to:{
            address: `${intra_id}@student.42seoul.kr`
        },
        subject: "Ding Dong!",
        html: "<p>Please clean up your drinks.</p>"
    };  
    transporter.sendMail(mailOptions, (error, info) => {
        console.log(error, info)
    });  
}
var manageTime = {
    sendAlarm: function() {
        var curTime = new Date();
        if (parseInt(curTime.getMinutes()) % 1 === 0) {
            sendMail(intra_id);
            var idx = parseInt(curTime.hour) * 2;
            idx = curTime.minute === "00" ? idx : idx + 1;
            // console.log(alarmTable[0]);
        }
        timerId = setTimeout(manageTime.sendAlarm, 60000);
    },
    setAlarmTable: function(alarmTable, regTime, intraId) {
        var idx = parseInt(regTime.hour) * 2;
        console.log("regTime.minute:", regTime.minute);
        idx = regTime.minute === "00" ? idx : idx + 1;
        alarmTable[idx].push(intraId)
    },
    genAlarmArr: function(date) {
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
      },
      getTimeForm: function(date, hour, minute) {
        console.log(date.getFullYear());
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate(); 
        if (hour == undefined)
            hour = date.getHours();
        if (minute == undefined)
            minute = date.getMinutes();
        return (`${year}-${month}-${day}-${hour}:${minute}:00`);
      }
};

module.exports = manageTime;