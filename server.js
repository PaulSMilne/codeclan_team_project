var express = require('express');
var MongoClient = require('mongodb').MongoClient
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var FIGHTERS_DATA = path.join(__dirname + '/data/fighters.json');
var VENUES_DATA = path.join(__dirname + '/data/venues.json');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('/fighters', function (req, res) {
  fs.readFile(FIGHTERS_DATA, function(err, data){
    if(err){
      console.error(err)
      return
    }
    res.json(JSON.parse(data))
  });
});

app.get('/venues', function (req, res) {
  fs.readFile(VENUES_DATA, function(err, data){
    if(err){
      console.error(err)
      return
    }
    res.json(JSON.parse(data))
  });
});

app.get('/fighter_stats', function(req, res) {
  var url = 'mongodb://localhost:27017/streetfighter';
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('fighter_stats');
    collection.find({}).toArray(function(err, docs) {
      res.json(docs)
      db.close();
    });
  });
});

app.post('/fighter_stats', function(req, res) {
  var url = 'mongodb://localhost:27017/streetfighter';
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('fighter_stats');
    collection.find({"name": req.body.name}).toArray(function(err, docs) {
      if (docs.length === 0) {
        collection.insert(
            { "name": req.body.name,
              "wins": req.body.wins,
              "draws": req.body.draws,
              "loses": req.body.loses
            }
        )
      } else {
        collection.update(
          {"name": req.body.name},
          { 
            $inc: { "wins": req.body.wins,
                    "draws": req.body.draws,
                    "loses": req.body.loses}
                  }
        )
      }
      res.status(200).end()
      db.close();
    })
  })
});

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Express server listening at http://%s:%s', host, port);
});
