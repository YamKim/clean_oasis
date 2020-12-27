var manageTime = {
    sendAlarm: function() {
        var curTime = new Date();
        if (parseInt(curTime.getMinutes()) % 30 === 0) {
            console.log("====================303030===================");
            var idx = parseInt(curTime.hour) * 2;
            idx = curTime.minute === "00" ? idx : idx + 1;
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
        var month = date.getMonth();
        var day = date.getDate(); 
        if (hour == undefined)
            hour = date.getHours();
        if (minute == undefined)
            minute = date.getMinutes();
        return (`${year}-${month}-${day}-${hour}:${minute}:00`);
      }
};


module.exports = manageTime;