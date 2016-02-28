var glob = require('glob');

exports.browse= function (req, res) {
        console.log('browse() called');
        glob('./htdoc/albums/album1/thumb-*.jpg', null, function(err, files) {
                // console.log('call');
                res.writeHead(200);
                res.write( '<html> <head> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"> </head> <body>');
                for (var f in files) {
                        // console.log(files[f]);
                        var thumb=files[f].substring(7);
                        var img=thumb.replace("/thumb-", "/");
                        // console.log(files[f].substring(7));
                        res.write("<a href=\"" + img + "\"><img src=\"" + thumb + "\"\></a>\n");
                }
                res.write('</body> </html>');
                res.end();
        });
};

