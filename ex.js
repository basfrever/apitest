var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var cors=require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://basavaraj:basu123@ds133388.mlab.com:33388/abt";
var bodyParser=require('body-parser');
var path = require('path');
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist/myApp')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'index.html'));
});
app.get('/getAllUsersData', function (req, res) {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
   var dbo = db.db("abt");
  
  dbo.collection("user").find({}).toArray(function(err,results) {
     if (err) throw err;
    res.json(results)
    db.close();
  });
}); 
});
app.post('/sendUserData', function (req, res) {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
   var dbo = db.db("abt");
  
  dbo.collection("user").insertOne(req.body,function(err,results) {
     if (err) throw err;
    res.json(results)
    db.close();
  });
}); 

})

app.listen(port);