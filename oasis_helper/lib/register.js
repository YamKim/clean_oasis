var register = {
    selectCategory: function(type) {
        var id = ["", "", ""];
        id[type] = "selected";
        for (var i = 0; i < 3; ++i) {
            if (i == type) continue ;
            id[i] = "unselected";
        }
        var ret = 
        `
            <div><a id=${id[0]} href="/register">음료</a></div>
            <div><a id=${id[1]} href="/register/snack">간식</a></div>
            <div><a id=${id[2]} href="/register/etc">비품</a></div>
        `;
        return (ret);
    },
    photoBox: function() {
        var ret = `
            <div> photo </div>
            <div> <button type="button"> button </button> </div>
        `
        return (ret);
    },
    form: function(type, alarmArr) {
        var category;
        var content;
        if (type == "beverage")
        {
            category = this.selectCategory(0);         
            content = this.beverage(alarmArr); 
        }
        else if (type == "snack")
        {
            category = this.selectCategory(1);         
            content = this.snack();
        }
        else if (type == "etc")
        {
            category = this.selectCategory(2);         
            content = this.etc();
        }
        var ret = 
        `
        <div class="cell">
            ${category}
        </div>
        <div class="cell">
            <input type="text" name="intraId" placeholder="intra ID">
        </div>
        ${content}
        <div class="cell">
            <div><input type="submit" value="등록"></div>
            <div><a href="/register">초기화</a></div>
        </div>
        `
        return (ret);
    },
    beverage: function(alarmArr) {
        ret = 
        `
            <div class="cell">
                <div><input type="radio" name="alarm" value=0 checked>${alarmArr[0].hour}:${alarmArr[0].minute}</div>
                <div><input type="radio" name="alarm" value=1>${alarmArr[1].hour}:${alarmArr[1].minute}</div>
                <div><input type="radio" name="alarm" value=2>${alarmArr[2].hour}:${alarmArr[2].minute}</div>
                <div><input type="radio" name="alarm" value=3>${alarmArr[3].hour}:${alarmArr[3].minute}</div>
            </div>
            <div class="cell">
                <div><input type="radio" name="alarm" value=4>${alarmArr[4].hour}:${alarmArr[4].minute}</div> 
                <div><input type="radio" name="alarm" value=5>${alarmArr[5].hour}:${alarmArr[5].minute}</div>
                <div><input type="radio" name="alarm" value=6>${alarmArr[6].hour}:${alarmArr[6].minute}</div>
                <div><input type="radio" name="alarm" value=7>${alarmArr[7].hour}:${alarmArr[7].minute}</div>
            </div>

        `;
        return (ret);
    },
    snack: function() {
        ret =
        `
            <div class="cell">
                <textarea name="message" placeholder="message"></textarea>
            </div>
            <div class="cell">
                <select class="category" name="notification">
                    <option name="beverage" value=1>채널에 알리기</option>
                    <option name="snack" value=0>조용히 기부하기</option>
                </select>
            </div>
        `;
        return (ret);
    },
    etc: function() {
        ret =
        `
            <div class="cell">
                <textarea name="message" placeholder="message"></textarea>
            </div>
            <div class="cell">
                <select class="category" name="notification">
                    <option name="beverage" value=1>채널에 알리기</option>
                    <option name="snack" value=0>조용히 기부하기</option>
                </select>
            </div>
        `;
        return (ret);
    }

}

module.exports = register;