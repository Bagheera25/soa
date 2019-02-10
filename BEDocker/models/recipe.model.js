const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecipeSchema = new Schema ({
    name: {type: String},
    ingredients: {type: String},
    description: {type: String}
});

module.exports = mongoose.model('Recipe', RecipeSchema);
