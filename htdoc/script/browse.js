$(document).ready(function() {
        var jqxhr=$.ajax({
                url: 'api/getPics',
                type: 'POST',
                data : {album : 'album1'},
        })
        .done(function(a) {
                if (a.status != 100) {
                        alert("Error " + a.status + " : " + a.msg);
                } else {
                        appendPics(a.path, a.pics);
                }
        })
        .fail(function(jqxhr, status, msg) {
                alert("Failed to connect to server: " + status + ", " + msg);
        });


	$("#button-new-album").click(newAlbum);
});

function appendPics(path, pics) {
        for (var p in pics) {
                $('#pics').append("\t<a href='" + path + "/" + pics[p] + "'><img src='" + path + "/thumb-" + pics[p] + "'></a>\n");
        }

        // set click functions for buttons
        $('#button-upload').click(function() {
                window.location.href="/upload.html";
        });
}

function newAlbum() {
        var answer=prompt("Please enter album name:");
        if (answer == null) return;
        var jqxhr=$.ajax({
                url: "api/newAlbum",
                type: 'POST',
                data: {name : answer},
        });
        jqxhr.done(function(a) {
		alert("got return " + JSON.stringify(a));
        });
        jqxhr.fail(function(jqxhr, status, msg) {
                alert("Failed to connect to server: " + status + ", " + msg);
        });
}

