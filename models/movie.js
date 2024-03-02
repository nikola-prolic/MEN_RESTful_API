const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let movieSchema = new Schema(
    {
        title: {type: String},
        genre: {type: String},
        price: {type: Number},
        inStock: {type: Boolean}
    }
);

module.exports = mongoose.model("movie", movieSchema);