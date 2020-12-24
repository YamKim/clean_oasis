var controlTime = {
    setAlarmTable: function(alarmTable, regTime, intraId) {
      var idx = parseInt(regTime.hour) * 2;
      console.log("regTime.minute:", regTime.minute);
      idx = regTime.minute === "00" ? idx : idx + 1;
      alarmTable[idx].push(intraId)
    }
}

module.exports = controlTime;