define(
    ['controls/info',
    'controls/slider',
    'controls/crawl',
    'controls/list',
    'lib/socket.io'], 
    function(info,sl,crawl,list,sio) {

  
  sl.create({
    "id"              : "slider1",
    "parent"          : document.querySelector(".slider_container"),
    "update_function" : function(y) { console.log("1",y) }
  });
  sl.create({
    "id"              : "slider2",
    "parent"          : document.querySelector(".slider_container"),
    "update_function" : function(y) { crawl.updateCutoff(y) }
  });


  var crawl = crawl.create({
    "id"           : "crawls",
    "parent"       : "crawl",
    "property"     : "value1",
    "barmouseover" : function(o) { inf.set(o) }
  });



  var socket = io.connect('http://localhost');
  socket.on('data', function(data) {
    crawl.data.shift();
    crawl.data.push(data);
    crawl.redraw(); 
    li.update(crawl.getAccepted());
  });


  var inf = info.create({
    "id":"info",
    "parent":document.querySelector(".options")
  });

  var li = list.create({
    "id": "bla",
    "parent":document.querySelector("#list"),
    "main_property":"value1"
  });

  return {
    "sup":"bro"
  }

});
