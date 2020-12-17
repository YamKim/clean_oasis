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
              <div>음료</div>
              <div>간식</div>
              <div>비품</div>
            </div>
            <div><input type="text" name="intraId" placeholder="intra ID"></input></div>
            <div class="cell">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
            <div class="cell">
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
            </div>
            <div class="cell">
              <div>1</div>
              <div>2</div>
            </div>
          </div>
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