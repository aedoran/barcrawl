require(['barcrawl','lib/socket.io'],function(barcrawl,socketio) {

  
  var bc = barcrawl.create({
    max_values : {'value1' : 100, 'value2' : 100, 'value3' : 100, 'value3' : 125, 'value4':12},
    values : ['value1','value2','value3','value4'],
    num_of_bars : 90
  });


  var socket = io.connect("http://localhost/");
  socket.on('data', function(d) {
    
    bc.update(d);
  
  });


}); 

