define([
    '/scripts/underscore.js',
    '/scripts/lib/d3.js',
    '/scripts/helper.js'
    ], function(_,d3,helper) {

  var crawl = function(args) {
    var min_args = ['id','parent','property'];

    var params = args;

    //evaluated height cutoff
    var cutoff = args.cutoff ? args.cutoff : Math.floor(params.max/4);

    var accepted = [];

    var highlight = "none";
    
    this.data = params.data;


    var cont = helper.makeEl("div");
    cont.id = params.id;
    helper.getEl(params.parent).appendChild(cont);
   


    //get the height of bars from stylesheet
    var width = "100";
    var height = "20";
    var rl = document.styleSheets[0].cssRules;
    for (var i in rl) {
      if (rl[i].selectorText == ".chart") {
        width = rl[i].style.width.replace("px","");
        height = rl[i].style.height.replace("px","");
      }
    } 

    //bar width and height
    var w = width/params.num_of_bars, h = height;


    // x, y mappings of data
    var x = d3.scale.linear()
      .domain([0,1])
      .range([0,w]);

    var y = d3.scale.linear()
      .domain([0,params.max])
      .rangeRound([0,h]);
    
    var chart  = d3.select("#"+params.id).append("svg:svg")
      .attr("class","chart")
      .attr("width",w*(this.data.length - 1))
      .attr("height",h);
    


    //bars
    chart.selectAll("rect")
      .data(this.data)
    .enter().append("svg:rect")
      .attr("x",function(d,i) { return x(i) -.5; })
      .attr("y",function(d) { return h - y(d[params.property]) - .5; })
      .attr("width",w)
      .attr("height",function(d) { return y(d[params.property]); })
      .attr("class","bar")

    var initial_cutoff_pos = h-(h*cutoff/params.max);
    console.log(params.max);
    console.log(cutoff);
    console.log(h);
    console.log(initial_cutoff_pos);
    console.log(w);
    //cut off line
    chart.insert("svg:line")
      .attr("x1","0")
      .attr("x2",w*this.data.length)
      .attr("y1",initial_cutoff_pos)
      .attr("y2",initial_cutoff_pos)
      .attr("class","threshold");
    
    //number on the line
    chart.insert("svg:text")
      .attr("x",0)
      .attr("y",initial_cutoff_pos)
      .attr("class","threshold-text")
      .text(cutoff);
    
    //value text
    chart.insert("svg:text")
      .attr("x",w*(this.data.length))
      .attr("y",h)
      .attr("text-anchor","end")
      .attr("class","value-label")
      .text(params.property);


    var el = document.querySelector("#"+params.id+" line");

    var tracking = -1; 
    var getValueFromOffset = function(y) {
      return Math.round(params.max*(h-y)/h); 
    } 
    var that = this;
    var track = function(start,e) {
      if (start == 1 ) {
        tracking = 1;
      } else if (start == -1) {
        tracking = -1;
      }
      if (tracking > -1) {
        that.updateCutoff(e.offsetY,getValueFromOffset(e.offsetY));
      } 
    }
    helper.addEvent(el,"mousedown",function(e) {
       track(1,e);
    });
    helper.addEvent(document.querySelector("#"+params.id),"mousemove",function(e) {
       track(0,e);
    });
    helper.addEvent(el,"mouseup",function(e) {
       track(-1,e);
    });

   // add events
   if (typeof params.barmouseover == 'function') {
   
     var cont_el = helper.getEl("#"+params.id);
     helper.addEvent(cont_el,'mouseover',function(e) {
       
       if (helper.hasClass(e.target,"bar")) {
         var bars = helper.getAllEl("#"+params.id+' .bar');
         for (var i in bars) {
           if (bars[i].getAttribute) {
             helper.remClass(bars[i],"highlight");
           }
         }

         helper.addClass(e.target,"highlight");

         params.barmouseover(JSON.parse(e.target.getAttribute("d")),args.prop_id);
       }
     });
  }


   this.redraw = function() {
 
    var rect = chart.selectAll("rect").data(this.data, function(d) {return d.time});

    var y = d3.scale.linear()
      .domain([0,params.max])
      .rangeRound([0,h]);

    rect.enter().insert("svg:rect","line")
      .attr("x",function(d,i) { 
         return x(i) -.5; 
      })
      .attr("y",function(d) { 
         return h - y(d[params.property]) -.5; })
      .attr("width",w)
      .attr("height", function(d) { return y(d[params.property]) })
      .attr("class",function(d) { 
         var hc = "";
         if (highlight == JSON.stringify(d)) {
           hc = " highlight";
         }
         if (d[params.property] > cutoff) {
           return "bar accepted"+hc;
         } else { 
           return "bar"+hc;
         }


      })
      .attr("d",function(d) {return JSON.stringify(d)});

    
    rect.transition()
      .duration(100)
      .attr("x",function(d,i) { return x(i) - .5 })
      .attr("class",function(d) { 
         var hc = "";
         if (highlight == JSON.stringify(d)) {
           hc = " highlight";
         }
         if (d[params.property] > cutoff) {
           return "bar accepted"+hc;
         } else { 
           return "bar"+hc;
         }
      })
      .attr("d",function(d) {return JSON.stringify(d)});
     

    rect.exit().remove();

    var updateCutoff = function(pos,val) {
      cutoff = val;

    chart.select("text").attr("y",pos).text(val);
    chart.select("line")
      .attr("y1",pos)
      .attr("y2",pos)
    }

    this.updateCutoff = updateCutoff;
    
   

    this.getAccepted = function() {
      return _.filter(this.data,function(d)
          { return cutoff < d[params.property] });
    }


    this.highlight = function(obj) {
      var bars = document.querySelectorAll("#"+params.id+" .bar");
      var str = JSON.stringify(obj);
      for (var i=0; i<bars.length; i++) {

        if (bars[i].getAttribute("d") == str) {

          bars[i].setAttribute("class",
            bars[i].getAttribute("class")+ " highlight");
          highlight = str;
        }
      }
    }
       
   
   
   }


  }
  return {
    create : function(args) {
      return new crawl(args);
    } 
  } 
    
});
