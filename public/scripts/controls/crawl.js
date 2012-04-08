define(['/scripts/underscore.js','/scripts/lib/d3.js'], function(_,d3) {

  var crawl = function(args) {
    var min_args = ['id','parent','property'];

    var params = args;

    var cutoff = 20;

    var accepted = [];
    
    this.data = [];
    var obj = {};
    obj[params.property] = 0;
    obj.time = (new Date()).getTime();
    for (var i=0;i<80;i++) { this.data.push(obj) }

     
    //bar width and height
    var w = 5, h = 100;

    // x, y mappings of data
    var x = d3.scale.linear()
      .domain([0,1])
      .range([0,w]);

    var y = d3.scale.linear()
      .domain([0,100])
      .rangeRound([0,h]);

    var chart  = d3.select("#"+ params.parent).append("svg:svg")
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

    //cut off line
    chart.insert("svg:line")
      .attr("x1","0")
      .attr("x2",w*(this.data.length - 1))
      .attr("y1","50")
      .attr("y2","50")
      .attr("class","threshold");



   // add events
   if (typeof params.barmouseover == 'function') {
    document.querySelector('.chart').addEventListener("mouseover",function(e) {
      //highlighting logic
      if (e.target.getAttribute("class").indexOf("bar") > -1) {
        var bars = document.querySelectorAll(".bar");
        for (var i=0; i<bars.length; i++) {
          bars[i].setAttribute("class",
            bars[i].getAttribute("class").replace("highlight",""))
        }
        e.target.setAttribute("class", 
          e.target.getAttribute("class")+ " highlight");

        //run the param function
        params.barmouseover(JSON.parse(e.target.getAttribute("d")));
      } 
    });
   }

   this.redraw = function() {
 
    var rect = chart.selectAll("rect").data(this.data, function(d) {return d.time});

    rect.enter().insert("svg:rect","line")
      .attr("x",function(d,i) { 
         return x(i) -.5; 
      })
      .attr("y",function(d) { return h - y(d[params.property]) -.5; })
      .attr("width",w)
      .attr("height", function(d) { return y(d[params.property]) })
      .attr("class",function(d) { 
         if (d[params.property] > cutoff) {
           return "bar accepted";
         } else { 
           return "bar";
         }
      })
      .attr("d",function(d) {return JSON.stringify(d)});

    
    rect.transition()
      .duration(100)
      .attr("x",function(d,i) { return x(i) - .5 })
      .attr("class",function(d) { 
         if (d[params.property] > cutoff) {
           return "bar accepted";
         } else { 
           return "bar";
         }
      })
      .attr("d",function(d) {return JSON.stringify(d)});
     

    rect.exit().remove(); 

    this.updateCutoff = function(val) {
      cutoff = val;

    chart.select("line").transition(10)
      .attr("y1",100-cutoff)
      .attr("y2",100-cutoff)
    }  
    
   

    this.getAccepted = function() {
      return _.filter(this.data,function(d) { return cutoff < d[params.property] });
    }

    this.setArgs(args) {
      _.extend(params,args);
    }
   
   
   }


  }
  return {
    create : function(args) {
      return new crawl(args);
    } 
  } 
    
});
