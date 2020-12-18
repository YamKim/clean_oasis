module.exports = {
  html: function(head, body, tail) {
    var ret = 
      `
      <!doctype html>
      <html>
        <head>
          ${head}
        </head>
        <body>
          ${body}
        </body>
      </html>
      `;
    return (ret);
  },
  info: function(cssPath, img) {
    var ret = `
    <link rel="stylesheet" href=${cssPath}>
    <div class="wrapper">
      <div class="head">
        <div class="category">
            <div><a href="/">안내</a></div>
            <div><a href="/beverage">음료</a></div>
            <div><a href="/snack">간식</a></div>
            <div><a href="/etc">비품</a></div>
        </div>
        <div class="category">
            <div></div>
        </div>
        <div class="category">
            <div><a href=/register>등록</a></div>
        </div>
      </div>
      <div>
        <img src=${img} width=700px height=250px>
      </div>
    </div>
    ` 
    return (ret);
  },
  register_beverage: function(cssPath, alarmArr) {
    var ret = `
    <link rel="stylesheet" href=${cssPath}>
    <form action="/register_beverage_post" method="post">
    <div class="wrapper">
        <div class="head">
          <div class="category">
              <div><a href="/">안내</a></div>
              <div><a href="/beverage">음료</a></div>
              <div><a href="/snack">간식</a></div>
              <div><a href="/etc">비품</a></div>
          </div>
          <div class="category">
              <div></div>
          </div>
          <div class="category">
              <div><a href=/register>등록</a></div>
          </div>
        </div>
        <div class="body">
          <div class="box">
            <div>
              photo
            </div>
            <div>
              <button type="button">
                button
              </button>
            </div>
          </div>
          <div class="box">
            <div class="cell">
              <div><a id="selected" href="/register">음료</a></div>
              <div><a id="unselected" href="/register/snack">간식</a></div>
              <div><a id="unselected" href="/register/etc">비품</a></div>
            </div>
            <div><input type="text" name="intraId" placeholder="intra ID"></div>
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
            <div class="cell">
              <div><input type="submit" value="등록"></div>
              <div><a href="/register">초기화</a></div>
            </div>
          </div>
        </div>
    </div>
    </form>
    ` 
    return (ret);
  },
  register_snack: function(cssPath) {
    var ret = `
    <link rel="stylesheet" href=${cssPath}>
    <form action="/register_snack_post" method="post">
      <div class="wrapper">
        <div class="head">
          <div class="category">
              <div><a href="/">안내</a></div>
              <div><a href="/beverage">음료</a></div>
              <div><a href="/snack">간식</a></div>
              <div><a href="/etc">비품</a></div>
          </div>
          <div class="category">
              <div></div>
          </div>
          <div class="category">
              <div><a href=/register>등록</a></div>
          </div>
        </div>
        <div class="body">
          <div class="box">
            <div>
              photo
            </div>
            <div>
              <button type="button">
                button
              </button>
            </div>
          </div>
          <div class="box">
            <div class="cell">
              <div><a id="unselected" href="/register">음료</a></div>
              <div><a id="selected" href="/register/snack">간식</a></div>
              <div><a id="unselected" href="/register/etc">비품</a></div>
            </div>
            <div><input type="text" name="intraId" placeholder="intra ID"></input></div>
            <div class="cell">
              <textarea name="message" placeholder="message"></textarea>
            </div>
            <div class="cell">
              <select class="category" name="notification">
                <option name="beverage" value=1>채널에 알리기</option>
                <option name="snack" value=0>조용히 기부하기</option>
              </select>
            </div>
            <div class="cell">
              <div><input type="submit" value="등록"></div>
              <div><a href="/register/snack">초기화</a></div>
            </div>
          </div>
        </div>
      </div>
    </form>
    ` 
    return (ret);
  },
  register_etc: function(cssPath) {
    var ret = `
    <link rel="stylesheet" href=${cssPath}>
    <form action="/register_etc_post" method="post">
      <div class="wrapper">
        <div class="head">
          <div class="category">
              <div><a href="/">안내</a></div>
              <div><a href="/beverage">음료</a></div>
              <div><a href="/snack">간식</a></div>
              <div><a href="/etc">비품</a></div>
          </div>
          <div class="category">
              <div></div>
          </div>
          <div class="category">
              <div><a href="/register">등록</a></div>
          </div>
        </div>
        <div class="body">
          <div class="box">
            <div>
              photo
            </div>
            <div>
              <button type="button">
                button
              </button>
            </div>
          </div>
          <div class="box">
            <div class="cell">
              <div><a id="unselected" href="/register">음료</a></div>
              <div><a id="unselected" href="/register/snack">간식</a></div>
              <div><a id="selected" href="/register/etc">비품</a></div>
            </div>
            <div><input type="text" name="intraId" placeholder="intra ID"></input></div>
            <div class="cell">
              <textarea name="message" placeholder="message"></textarea>
            </div>
            <div class="cell">
              <select class="category" name="notification">
                <option name="beverage" value=1>채널에 알리기</option>
                <option name="snack" value=0>조용히 기부하기</option>
              </select>
            </div>
            <div class="cell">
              <div><input type="submit" value="등록"></div>
              <div><a href="/register/etc">초기화</a></div>
            </div>
          </div>
        </div>
      </div>
    </form>
    ` 
    return (ret);
  },
  album: function(rowNum, data, cssPath) {
    if (rowNum % 4)
      rowNum /= 4;
    else
      rowNum /= 4 + 1;
    var k = -1;
    var j = -1;
    const colNum = 4;
    var ret = `<link rel="stylesheet" href=${cssPath}>`;
    while (++j < rowNum) {
      ret += `<div class="body">`;
      var i = -1;
      while (++i < colNum) {
        var intraId = data[++k].intra_id;
        var imgPath = `<img src = /images/${data[k].intra_id}.png width=100px height=100px>`;
        ret += `<div class="cell">`
        ret += `<div>${intraId}</div>`;
        ret += `<div>${imgPath}</div>`;
        ret += `</div>`; 
      }
      ret += `</div>`;
    }
    return (ret);
  }
}