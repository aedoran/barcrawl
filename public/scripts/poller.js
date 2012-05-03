require([],function() {

  var poller = function(args) {

    var xhr = new XMLHtppRequest();

    xhr.open("GET",args.location,true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4)  { args.cb("error: got a "+xhr.readyState+"from xhr and not a 4") }
      args.cb(null,xhr.responseText);
    }
    
    var get() {
     xhr.send(null);
    }

    return { get : get }
  }

  return {
    create : function(args) {
      return new poller(args);
    }
  }

});
