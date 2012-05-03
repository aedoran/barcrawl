define(['/scripts/underscore.js','/scripts/helper.js'],function(_,h) {

  var list = function(args) {
    var min_args = ['id','parent','main_property'];

    var el = h.makeEl("div");
    el.id = args.id;
    args.parent.appendChild(el);
    var highlight = "none";
    var main_property = args.main_property;

    el.addEventListener("click",function(e) {

      if (e.target.tagName = "LI") {
        var lis = h.getAllEl("#"+el.id+" li");
        for (var i=0; i<lis.length; i++) {
          lis[i].setAttribute("class",
            lis[i].getAttribute("class").replace("highlight",""))
        }

        e.target.setAttribute("class", 
          e.target.getAttribute("class")+ " highlight");
        highlight = e.target.getAttribute("d");

        args.mouseover(JSON.parse(e.target.getAttribute("d")));
      }
    });

    var that = this;


    this.update = function(list) {
      var item_el = el.querySelector("#items"),
          items   = h.makeEl("ul");

      if (item_el) { el.removeChild(item_el) }
      

      items.id = "items";
      for (var i=list.length-1;i>=0;i--) {
        var li_el = h.makeEl("li");
        var str = JSON.stringify(list[i]);
        li_el.innerHTML = that.main_property+":"+list[i][that.main_property];
        if (str == highlight) {
          li_el.setAttribute("class","highlight");
        } else {
          li_el.setAttribute("class","");
        }
        
        li_el.setAttribute("d",str);
        items.appendChild(li_el);
      }

      el.appendChild(items);
    }

    this.updateMainProperty = function(prop) { 
      that.main_property = prop }
  }

  return {
    create : function(args) {
      return new list(args);
    }
  }
}); 
