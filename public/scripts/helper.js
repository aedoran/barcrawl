define([],function() {

  return {
    makeEl : function(name) {
      return document.createElement(name);
    },
    getEl : function(css) {
      return document.querySelector(css);
    },
    getAllEl : function(css) {
      return document.querySelectorAll(css);
    },
    addClass : function(el,value) {
      if (el.getAttribute("class") &&
          el.getAttribute("class").split(' ').indexOf(value) == -1) {
        el.setAttribute("class",
          el.getAttribute("class") + " "+value
        );
      }
    },
    remClass : function(el,value) {
      if (el.getAttribute("class")) {
        el.setAttribute("class",
          el.getAttribute("class").replace(value,"")
        );
      }
    },
    hasClass : function(el, value) {
      if (el.getAttribute("class")) {
        return el.getAttribute("class").split(' ').indexOf(value) != -1;
      }
    },
    addEvent : function(el,event,func) {
      el.addEventListener(event,func)
    },
    isNumber : function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n)
    }
  }


});
