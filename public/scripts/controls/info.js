define(['/scripts/underscore.js','/scripts/helper.js'],function(_,h) {

  var info = function(args) {
    var min_args = ['id','parent'];
    
    var el = h.makeEl("div");
    el.id = args.id;
    args.parent.appendChild(el);

  
    this.set = function(obj) {
      var prop_el = el.querySelector("#props"),
          props   = h.makeEl("ul");

      if (prop_el) { el.removeChild(prop_el) }
      

      props.id = "props";

      var k = _.keys(obj);
      for (i in k) {
        var li_el = h.makeEl("li");
        if (k[i] == "time") {
          li_el.innerHTML = "time : " + (new Date(obj[k[i]]));
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
