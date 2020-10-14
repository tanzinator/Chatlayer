var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var apiai = require('apiai');

var apiai_app = apiai("6d6f546051164cbf9103b51f7f0556d6");

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

http.listen(8081, function () {
    console.log('Listening on localhost:8081');
})

io.on('connection', function (socket) {
    socket.on('usermsg', function (msg) {

        var request = apiai_app.textRequest(msg, {
            sessionId: 'echobot'
        });
        if (request) {

            request.on('response', function (response) {
                io.emit('botmsg', msg);
            });
            request.end();
        }
    });
});