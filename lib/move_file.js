var fs = require('fs');
var path = require('path');
var control = {
    move2Save: function(dirName, fileName) {
        var newPath = path.resolve(dirName, 'public', 'beverage_images', fileName);
        var oldPath = path.resolve(dirName, fileName);
        fs.rename(oldPath, newPath, function(err){
          if (err) throw err
        });
        console.log("move2Save complete");
    },
    move2Trash: function(dirName) {
        var files = fs.readdirSync(dirName);
        for (var i = 0; i < files.length; ++i) {
            console.log(files[i]);
            if (path.extname(files[i]) == '.png')
            {
              var oldPath = path.resolve(dirName, files[i]);
              var newPath = path.resolve(dirName, 'public', 'trash', files[i]);
              fs.rename(oldPath, newPath, function(err){
                if (err) throw err
              });
            }
        }
        console.log("move2Trash complete");
    }

}

module.exports = control;