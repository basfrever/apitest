var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://basavaraj:basu123@ds133388.mlab.com:33388/abt";
 

app.get('/', function (req, res) {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
   var dbo = db.db("abt");
  
  dbo.collection("user").find({}).toArray(function(err,results) {
     if (err) throw err;
    res.json(results)
    db.close();
  });
});
  

})

app.listen(port);