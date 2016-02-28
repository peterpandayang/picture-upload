var express = require('express');
var multer = require('multer'); 
var bodyParser = require('body-parser');
var api = require("./api.js");
var app = express(); 
var directory = require('serve-index');


app.use('/albums',directory('htdoc/albums'));
app.use(express.static('htdoc'));
app.use(multer({dest:'./uploads'}).single('image-file')); 
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/getPics',api.getPics);
app.post('/api/newAlbum', api.newAlbum);

app.post('/upload', function (request, response) {
        // response.send('upload called');
        // console.log(request.file.path);
        var srcFile = request.file.path;
        var dstFile = './htdoc/albums/album1/' + request.file.filename + '.jpg';
        require("./copyFile.js").copyFile(srcFile, dstFile, function(){
                // console.log("copy done");
                var dstThumb = './htdoc/albums/album1/thumb-' + request.file.filename + '.jpg';
    
                genThumb(srcFile, dstThumb, function(){
                        // console.log('imagemagick convert() done');
                        response.redirect('/browse.html');
                });
        })
});

function genThumb(src, dst, cb) {
        // console.log(src,"....",dst);
        require('imagemagick').convert([src, "-thumbnail",
        "100x100^", "-gravity", "center", "-crop", "100x100+0+0",
        "+repage", "-synchronize", dst], cb);
        }
        

// app.get('/browse',require('./browse.js').browse);

app.get('/',function(request,response){ response.redirect('/upload.html');
});
 
 
app.listen(8080, function() { 
        console.log('listening on port 8080 ...'); 
}); 