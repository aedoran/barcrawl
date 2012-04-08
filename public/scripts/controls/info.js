define(['/scripts/underscore.js'],function(_) {

  var info = function(args) {
    var min_args = ['id','parent'];
    
    var el = document.createElement("div");
    el.id = args.id;
    args.parent.appendChild(el);

  
    this.set = function(obj) {
      var prop_el = el.querySelector("#props"),
          props   = document.createElement("ul");

      if (prop_el) { el.removeChild(prop_el) }
      

      props.id = "props";

      var k = _.keys(obj);
      for (i in k) {
        var li_el = document.createElement("li");
        if (k[i] == "time") {
          li_el.innerHTML = "time : " + Date(obj[k[i]]);
        } else {
          li_el.innerHTML = k[i] + " : " + obj[k[i]];
        }
        props.appendChild(li_el);
      }

      el.appendChild(props);
    }
    
  }
   
  return {
    create : function(args) {
      return new info(args);
    }
  }
});
