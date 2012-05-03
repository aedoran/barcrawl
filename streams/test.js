var teststream = function(args) {

  var interval, c=0;

  interval = setInterval(function() {
    args.callback(
      {
       counter   : c,
       time   : (new Date()).getTime(),
       value1 : 50*Math.sin((new Date()).getTime()/1000)+50, 
       value2 : 100*Math.random(), 
       value3 : 50*Math.sin((new Date()).getTime()/2500)+50, 
       value4 : 12*Math.random(),
       text   : "yo"
     });
    c = c +1;
  },args.wait);

  var stop = function() {
    clearInterval(interval);
  }

  return {stop:stop};
}

module.exports = function(args) {
  return new teststream(args);
}

