define(['/scripts/underscore.js','/scripts/helper.js'], 
function(_,h) {

   var slider = function(args) {
     var min_args = ['id','parent','update_function'],
         el = h.makeEl("div");
    
     el.id = args.id;

    this.args = {};
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
        args.update_function(this.value,args.prop_id);
      } 
    }
    h.addEvent(el,"mousedown",function(e) {
       track(1,e);
    });
    h.addEvent(el,"mousemove",function(e) {
       track(0,e);
    });
    h.addEvent(el,"mouseup",function(e) {
       track(-1,e);
    });

    h.addClass(el,"slider");
    el.setAttribute("class","slider");
    h.getEl(args.parent).appendChild(el);
 
   }

   return {
     create : function(args) {
       return new slider(args);
     }
   }
  

});
