const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http');

var Recipe = require('./models/recipe.model');

const mongoose = require('mongoose');
var db_url = 'mongodb://mada25:sylvanas25@ds223015.mlab.com:23015/recipesdb'

const mongoDB = db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.listen(8080, () => {
  console.log('Server started!');
});

app.get("/test", (req, res) => {
  res.json(["Tony", "Lisa"]);
});

//Create a recipe
createRecipe = function (req, res) {
  var recipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    description: req.body.description
  });
  recipe.save(function () {
    res.send('Product Created successfully')
  })
}

app.post('/create', createRecipe)

// app.route('/recipes').get((req, res) => {
//   https.get('https://api.mlab.com/api/1/databases/recipesdb/collections/recipes?apiKey=gihwyXe6hsduWthTR-EVouvV9ZcsX5yT', (resp) => {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     res.json(data);
//   });
//   }).on("error", (err) => {
//     console.log("Error: " + err.message);
//   });
// });

module.exports = app;