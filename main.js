var io      = require('socket.io'),
    fs      = require('fs'),
    express = require('express');

var app = express.createServer()
  , io = io.listen(app);

app.listen(80);

app.use(express.static(__dirname + '/public'));

var test = io.sockets.on('connection', function (socket) {
    console.log("news sent");
    socket.emit('news', { hello: 'world' });
});



app.get("/",function(req,res) {
  fs.readFile(__dirname + "/index.html", function(err,data) {
    if (err) { throw err };
    res.header('Content-Type', 'text/html');
    res.send(data);
  });
});


