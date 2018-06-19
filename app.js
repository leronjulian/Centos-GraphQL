var express = require('express');
const app = express();


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.get('/graphql', (req, res) => {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("books_db");

    var obj = 
    [
      {title: 'Testing', author: 'Testing '}
    ];

    dbo.collection("books_db").insertMany(obj, function(err, res){
      if (err) throw err;
      console.log("Added Entry")
      db.close()
    });

  res.send("Inserted Into Database");
})
  	  	
  /*
    //Part 1
	app.get('/books/title/Jurassic%20Park', function(req, res) {
  		dbo.collection("books").find({title: 'Jurassic Park'}, {_id: 0, title: 1, author: 1}).toArray(function(err, docs) {
  			res.send(docs[0])
    	});
	})

	app.get('/books/author/J.K.%20Rowling', function(req, res) {
  		dbo.collection("books").find({author: 'J.K. Rowling'}).toArray(function(err, docs) {
  			res.send(docs[0])
    	});
	})

	app.get('/books/all', function(req, res) {
		dbo.collection("books").find({}, {_id: 0}).limit(2).toArray(function(err, result){
  			res.send(result)
		})
	})
  */

});


app.listen(9000, function(){
	console.log("Listening on port 9000");
})
