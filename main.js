var io            = require('socket.io'),
    fs            = require('fs'),
    express       = require('express'),
    stock         = require(__dirname + '/streams/stock'),
    teststream    = require(__dirname + '/streams/test'),
    twitter       = require(__dirname + '/streams/twitter');

var app = express.createServer()
  , io = io.listen(app);

app.listen(80);


app.use(express.static(__dirname + '/public'));

var test = io.sockets.on('connection', function (socket) {
  /* stock stream */

/*  
    var s = stock({
      stocks : ["GOOG"],
      format : ["s","n","r","v","l1","m3","m4"],
      wait   : 5000,
      callback : function(d) { 
        console.log(d);
        socket.emit('data',d);
      }
    });
    s.go(); 
  */ 
  
  
  /* test stream */ 
  
  var t = teststream({
    wait:1000,
    callback:function(d) {
      socket.emit('data',d);
    }
  });
  t.go();

  
  
  /*
  var t = twitter({
    wait:2000,
    callback:function(d) {
      socket.emit('data',d);
    }
  });
  t.go();
  */

});



app.get("/",function(req,res) {
  fs.readFile(__dirname + "/index.html", function(err,data) {
    console.log("wtf");
    if (err) { throw err };
    res.header('Content-Type', 'text/html');
    res.send(data);
  });
});


