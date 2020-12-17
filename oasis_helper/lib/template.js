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
      <tail>
        ${tail}
      </tail>
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
            <div><a href="beverage">음료</a></div>
            <div><a href="snack">간식</a></div>
            <div><a href="etc">비품</a></div>
        </div>
        <div class="category">
            <div></div>
        </div>
        <div class="category">
            <div><a href="register">등록</a></div>
        </div>
      </div>
      <div>
        <img src=${img} width=700px height=250px>
      </div>
    </div>
    ` 
    return (ret);
  },
  register: function(cssPath, button) {
    var ret = `
    <link rel="stylesheet" href=${cssPath}>
    <div class="wrapper">
        <div class="head">
            <div class="category">
                <div><a href="/">안내</a></div>
                <div><a href="beverage">음료</a></div>
                <div><a href="snack">간식</a></div>
                <div><a href="etc">비품</a></div>
            </div>
            <div class="category">
                <div></div>
            </div>
            <div class="category">
                <div><a href="register">등록</a></div>
            </div>
        </div>
        <div class="body">
            <div class="box"></div>
            <div class="box">
              <div>
                photo
              </div>
              <div>
                <button type="button">
                  ${button}
                </button>
              </div>
            </div>
            <div class="box"></div>
            <div class="box">
                <div>select beverage</div>
                <div></div>
                <div>insert intraID</div>
                <div></div>
                <div>set alarm</div>
                <div></div>
            </div>
            <div class="box"></div>
        </div>
        <div class="tail">
        </div>
    </div>
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
    const colNum = 4
    var ret = `<link rel="stylesheet" href=${cssPath}>`;
    while (++j < rowNum) {
      ret += `<div class="body">`;
      var i = -1;
      while (++i < colNum) {
        var intraId = data[++k].intra_id;
        var imgPath = `<img src = /images/${data[k].intra_id}.png width=100px height=100px>`;
        ret += `<div class="cell">`; 
          ret += `<div>${intraId}</div>`;
          ret += `<div>${imgPath}</div>`;
        ret += "</div>"; 
      }
      ret += `</div>`;
    }
    return (ret);
  }
}