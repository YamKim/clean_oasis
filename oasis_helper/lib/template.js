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
    grid: function(cssPath) {
      var ret = `
      <link rel="stylesheet" href=${cssPath}>
      <div class="wrapper">
          <div class="head">
              <div class="category">
                  <div>음료</div>
                  <div>간식</div>
                  <div>비품</div>
              </div>
              <div class="category">
                  <div>Empty</div>
              </div>
              <div class="category">
                  <div>등록</div>
              </div>
          </div>
          <div class="body">
              <div class="box"></div>
              <div class="box">photo</div>
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
      `;
      return (ret);
    }
}
