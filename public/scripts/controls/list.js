define(['/scripts/underscore.js'],function(_) {

  var list = function(args) {
    var min_args = ['id','parent','main_property'];

    var el = document.createElement("div");
    el.id = args.id;
    args.parent.appendChild(el);

    this.update = function(list) {
      
      var item_el = el.querySelector("#items"),
          items   = document.createElement("ul");

      if (item_el) { el.removeChild(item_el) }
      

      items.id = "items";
      console.log(list);
      for (var i=list.length-1;i>=0;i--) {
        var li_el = document.createElement("li");
        li_el.innerHTML = args.main_property+":"+list[i][args.main_property]; 
        items.appendChild(li_el);
      }

      el.appendChild(items);
    }
  }

  return {
    create : function(args) {
      return new list(args);
    }
  }
}); 
