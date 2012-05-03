define(
    ['controls/info',
    'controls/slider',
    'controls/crawl',
    'controls/list',
    'underscore',
    'helper'], 
    function(info,sl,c,list,_,h) {

  var barcrawl = function(args) {

    var data = [], props = [],
        max_values = args.max_values ?  args.max_values : {},
        num_of_bars = args.num_of_bars ? args.num_of_bars : 80;
        main_property = args.main_property ? args.main_property : "none";
        

    var update = function(d) {

        //if there is no data construct the views and sample data 
        if (data.length == 0) { build(d) }
        

        data.shift();
        data.push(d);

        //redraw with the graphs
        for (i in props) {
          props[i].redraw();
        }

        //update the list with the intersection of all the accepted 
        //values above the slider
        li.update(
          _.intersection.apply(
            null,
            _.map(props, function(p) { return p.getAccepted()})
          )
        );
    };


    //builds the sliders and crawlers based on properties of d
    var build = function(d) {
   
      //get the numbered properties
      var keys = _.keys(d);
      var obj = {};
      for (var i in keys) {
        //construct empty data
        if (h.isNumber(d[keys[i]])) {
          obj[keys[i]] = 0;
        }
      }

      //initialize data with some empty values so that crawlers can render
      for (var i=0;i<args.num_of_bars;i++) { data.push(obj) }


      //build slider and crawler
      for (var i in keys) {
        var k = keys[i];
        //make bar crawls for:
        //properties that are numbers
        //that if there is a "values" list in params, this prop is in it
        //that if there is an "exclude" list in parmas, this prop is not in it
        if (h.isNumber(d[k]) 
            && (!args.values || (args.values && !(_.indexOf(args.values,k)==-1))) 
            && (!args.exclude || (args.exclude && (_.indexOf(args.exclude,k)==-1)))
        ) {

          //needs to be set for the list view
          if (main_property == "none") { li.updateMainProperty(k); }


          //crawler
          var crawl = c.create({
            "id"           : "crawl_"+keys[i],
            "parent"       : "#props",
            "property"     : keys[i],
            "prop_id"      : i,
            "barmouseover" : function(o,self_i) { 
              inf.set(o);
            },
            "data"         : data,
            "max"          : args.max_values[keys[i]] ? args.max_values[keys[i]] : 1,
            "num_of_bars"  : args.num_of_bars
          });

          props.push(crawl);
        }
      }

    }

    //object info view
    var inf = info.create({
      "id":"info",
      "parent":document.querySelector("#info_container")
    });


    //list element view
    var li = list.create({
      "id": "listId",
      "parent":document.querySelector("#list"),
      "main_property":main_property,
      "mouseover":function(o) {
        for (i in props) { props[i].highlight(o); }
        inf.set(o);
      }
    });

    return {update : update};

  }


  return {
    create : function(args) {
      return new barcrawl(args);
    }
  }


});
