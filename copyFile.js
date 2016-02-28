// var fs=require("fs");

// exports.foo = function(scrFile, dstFile, cb){

//   var srcFile = fs.createReadStream("./srcFile.txt");
//   var dstFile = fs.createWriteStream("./dstFile.txt");
//   srcFile.pipe(dstFile);
  
//   srcFile.on('end', function(cb) { // 当没有数据时，关闭数据流
//     dstFile.end();
//     console.log("invoke when done");
//   });
// }


var fs = require('fs');

var copyFile = function(src, dst, cb) {
        var srcFile = fs.createReadStream(src);
        var dstFile = fs.createWriteStream(dst);
        srcFile.pipe(dstFile);
        srcFile.on('end', cb);
}

exports.copyFile = copyFile;

