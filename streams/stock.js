 var express = require('express'),
      http = require('http'),
      app = express.createServer();

// Using either Google or Yahoo..

  var stock = function(args) {
    var stocks   = args.stocks,
        format   = args.format,
        wait     = args.wait,
        callback = args.callback,
        interval;
        
   
    var parseResponse = function(data) {
       var obj = {},
           datas = data.replace("\r\n","").split(',');

       for (i in format) {
          obj[format[i]] = datas[i];
       }
       
       return obj;
    } 

    var getStock = function(stock) {
 
      var client = http.createClient(80,'download.finance.yahoo.com');
      var request = client.request('GET', '/d/quotes.csv?s='+stock+'&f='+format.join(""), { host: 'download.finance.yahoo.com' });

      //var client = http.createClient(80,'www.google.com');
      //var request = client.request('GET', '/finance/info?client=ig&q='+stock, { host: 'www.google.com'});

      request.end();

      request.addListener('response', function (response) {
        response.setEncoding(encoding="utf8");
        response.addListener('data', function (data) {
          callback( parseResponse(data) );
        });
        response.addListener('end',function(data) {
        });
      });

    }
   


    var getStocks = function() {
      for (i in stocks) {
         getStock(stocks[i]);
      }
    }
         

    var go = function() {
      interval = setInterval(getStocks,args.wait);
    }

    var stop = function() {
      clearInterval(interval);
    }
        
 
    return { stop : stop, go : go }

  }

  //app.listen(8080);

module.exports = function(args) {
  return new stock(args);
}
