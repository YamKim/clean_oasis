var fs = require('fs');
var path = require('path');
var control = {
    move2Save: function(dirName, fileName) {
        var newPath = path.resolve(dirName, 'public', 'beverage_images', fileName);
        var oldPath = path.resolve(dirName, fileName);
        fs.rename(oldPath, newPath, function(err){
          if (err) throw err
        });
    },
    move2Trash: function(dirName) {
        var files = fs.readdirSync(__dirname);
        for (var i = 0; i < files.length; ++i) {
            if (path.extname(files[i]) == '.png')
            {
              var oldPath = path.resolve(dirName, files[i]);
              var newPath = path.resolve(dirName, 'public', 'trash', files[i]);
              fs.rename(oldPath, newPath, function(err){
                if (err) throw err
              });
            }
        }
    }

}

module.exports = control;