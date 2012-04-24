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
