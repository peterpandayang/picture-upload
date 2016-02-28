var glob = require('glob');

exports.getPics = function(req, res) {
        var album=req.body.album;
        var ret = new Object();
        var localPath = "./htdoc/albums/" + album;
        ret.path = "/albums/" + album + "/";
        ret.pics=new Array();
        require('glob').glob(localPath + '/thumb-*.jpg', null, function(err, files) {
                for (var f in files) {
                        var img=files[f].replace(localPath + "/thumb-", "");
                        ret.pics.push(img);
                }
                ret.status=100;
                res.send(ret);
        });
};

exports.newAlbum = function (req, res) {
        console.log('api/newAlbum - called with name ' + req.body.name);

        var albumId = require('randomstring').generate(16);
        var path = './htdoc/albums/' + albumId;
        console.log('api/newAlbum - creating album directory ' + path);
        require('fs').mkdirSync(path);
        
        res.send({status:100, msg: albumId});
        console.log('api/newAlbum - returns ' + JSON.stringify({status:100, msg: albumId}));
}
