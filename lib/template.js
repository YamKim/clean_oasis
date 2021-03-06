var register = require('./register.js')
module.exports = {
  html: function(head, body, tail) {
    var ret = 
      `
      <!doctype html>
      <html>
        <head> ${head} </head>
        <body> ${body} </body>
      </html>
      `;
    return (ret);
  },
  category: function(cssPath, type) {
    function selectId(type) {
        ret = ["", "", "", "", ""];
        ret[type] = "category_selected";
        for (var i = 0; i < 5; ++i) {
            if (i == type) continue ;
            ret[i] = "category_unselected";
        }
        return (ret);
    }
    id = selectId(type);
    ret  = `
        <link rel="stylesheet" href=${cssPath}></link>
        <div class="head">
            <div class="category">
                <div><a id=${id[0]} href="/">안내</a></div>
                <div><a id=${id[1]} href="/beverage">음료</a></div>
                <div><a id=${id[2]} href="/snack">간식</a></div>
                <div><a id=${id[3]} href="/etc">비품</a></div>
            </div>
            <div class="category"> <div></div> </div>
            <div class="category">
                <div><a id=${id[4]} href=/register>등록</a></div>
            </div>
        </div>
    `
    return (ret);
  },
  info: function(img) {
    var ret = `<div><img src=${img} width=700px height=250px></div>` 
    return (ret);
  },
  album: function(data, cssPath) {
    console.log(data);
    rowNum = data.length;
    if (data.length % 4)
      rowNum = rowNum / 4 + 1;
    else
      rowNum = rowNum / 4;
    var k = -1;
    var j = -1;
    const colNum = 4;
    rowNum = Math.floor(rowNum);
    var ret = `<link rel="stylesheet" href=${cssPath}>`;
    ret += `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`
    console.log(`data : ${data.length}, row : ${rowNum}, col : ${colNum}`);
    
    while (++j < rowNum) {
      ret += `<div class="body">`;
      var i = -1;

      while (++i < colNum && k + 1 < data.length) {
        k++;
        var intraId = data[k].intra_id;
        var imgPath = `<img src = /beverage_images/${data[k].register_time}.png class="cover">`;
        console.log(imgPath);
        ret += `<div class="cell">`
        // ret += `<div>${intraId}</div>`;
        ret += `<div>${imgPath}</div>`;
        ret += `<div class="item">`;
        ret += `<div>1</div>`;
        ret += `<div><button type="button" id=${data[k].id}>삭제</button></div>`;
        ret += `</div>`; 
        ret += `</div>`;
        ret += `
        <script>
          document.getElementById(${data[k].id}).addEventListener("click",function() {
            axios.post('/album_delete', {idx: ${data[k].id}, status: 2}).then((result) => {
              console.log(result.data);
            }).catch((err) => {
              console.log('fail');
              console.error(err);
            });
          }); 
        </script>
      `
      }
      ret += `</div>`;

    }
    
    return (ret);
  },
  register: function(cssPath, alarmArr, type) {
    var photoBox = register.photoBox();
    var content;
    if (type == "beverage")
      content = register.form(type, alarmArr);
    else if (type == "snack")
      content = register.form(type);
    else if (type == "etc")
      content = register.form(type);
    var ret = `
      <link rel="stylesheet" href=${cssPath}>
      <form action="/register_beverage_post" method="post">
        <div class="body">
          <div class="box"> ${photoBox} </div>
          <div class="box"> ${content} </div>
        </div>
      </form>
    ` 
    return (ret);
  }

}
