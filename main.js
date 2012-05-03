var io            = require('socket.io'),
    fs            = require('fs'),
    express       = require('express'),
    teststream    = require(__dirname + '/streams/test');

var app = express.createServer()
  , io = io.listen(app);

app.listen(80);

app.use(express.static(__dirname + '/public'));


var test = io.sockets.on('connection', function (socket) {
  
  /* test stream */
  
  var t = teststream({
    wait:1000,
    callback:function(d) {
      socket.emit('data',d);
    }
  });

});

