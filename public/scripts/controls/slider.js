define(['/scripts/underscore.js'], function(_) {


   console.log(_);

   var slider = function(args) {
     var min_args = ['id','parent','update_function'],
         el = document.createElement("div");
    
     el.id = args.id;

    var tracking = -1; 
    var getValueFromOffset = function(y) {
      return Math.round(100*(el.offsetHeight-y)/el.offsetHeight); 
    } 
    var track = function(start,e) {
      if (start == 1 ) {
        tracking = 1;
      } else if (start == -1) {
        tracking = -1;
      }
      if (tracking > -1) {
        this.value = getValueFromOffset(e.offsetY);
        args.update_function(this.value);
      } 
    }
    el.addEventListener("mousedown",function(e) {
       console.log("d");
       track(1,e);
    });
    el.addEventListener("mousemove",function(e) {
       track(0,e);
    });
    el.addEventListener("mouseup",function(e) {
       console.log("u");
       track(-1,e);
    });

    el.setAttribute("class","slider");

    args.parent.appendChild(el);
 
   }

   return {
     create : function(args) {
       return new slider(args);
     }
   }
  

});
