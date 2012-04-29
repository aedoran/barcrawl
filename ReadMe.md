# Barcrawl

![](https://s3.amazonaws.com/132123/graphdbg/webpage.png)

I needed a way to look at many objects in a process to examine if the objets actually look sane.  So instead of console.logging them,
I simply push them over socket.io to a client that does the following:

* Inspects which are numeric values.
* Make bargraphs for each.
* Redraws as new data comes in.

I also added the following interactions in the view. 

* Each bar graph has a horizontal threshold.
* If an object has each attribute over the threshold it makes it into the accepted list.
* If I mouse over a bar the objects full details gets displayed.
* If I click an item in the list I the objects full details gets displayed, and the attributes get highlighted.

The view uses requirejs and d3.

# Quickly try out
just run 
```
node main.js
```
That will run a test stream of data and serve the pages on localhost


# Install

Put the contents of the public folder, public.

edit the /scripts/main.js based on your data

add the following to your webpage that will include the graph
```html
    <script data-main="scripts/main" src="scripts/require.js"></script>
    <link href="css/style.css" rel="stylesheet" type="text/css">
```
add an element with id of "info_container", "list", "props" somewhere on your page.

# Configuring main.js
```javascript

require(['barcrawl','lib/socket.io'],function(barcrawl,socketio) {

  
  var bc = barcrawl.create({
    max_values : {'value1' : 100, 'value2' : 100, 'value3' : 100, 'value3' : 40},
    values : ['value1','value2','value3','value4'],
    num_of_bars : 90,

  });

  var socket = io.connect("http://localhost/");
  socket.on('data', function(d) {
    
    bc.update(d);
  
  });

});
```
##The options 
* max_values : an object that maps the attributes names to its max value
* num_of_bars : the number of bars that each barcrawl will have
* values : list of attributes to graph. If not specified it will try and graph all of them
* exclude : list of attributes to not graph.
* main_property : string of the property to display in the accepted list.


