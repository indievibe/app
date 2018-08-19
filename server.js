/*
Setup the database connection
Using mongo database for dev, may want to use another one for prod, can look into it
*/

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
var db             = require('./config/db')

const app            = express();

// Port for database connection
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// Connecting to the mongo db that was created in mLab
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  // Connecting using the db user created in mLab
  db = database.db("indievibedev-user");
  require('./routes') (app, db);

  // Log to the console when db connection is live
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})