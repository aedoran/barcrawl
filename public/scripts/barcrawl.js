define(['controls/slider'], function(sl) {
  //io will have the client socket io stuff here

  
  sl.create({
    "id"              : "slider1",
    "parent"          : document.querySelector(".slider_container"),
    "update_function" : function(y) { console.log("1",y) } 
  });
  sl.create({
    "id"              : "slider2",
    "parent"          : document.querySelector(".slider_container"),
    "update_function" : function(y) { console.log("2",y) } 
  });



  return {
    "sup":"bro"
  }

});
