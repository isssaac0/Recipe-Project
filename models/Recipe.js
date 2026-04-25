const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

title: {
type: String,
required: true
},

ingredients: [
{
type: String,
required: true
}
],

cuisine: {
type: String,
default: ""
},

difficulty: {
type: String,
enum: ["easy","medium","hard"],
default: "easy"
},

category: {
type: String,
default: "main course"
},

prepTime: {
type: Number,
default: 0
},

isVeg: {
type: Boolean,
default: false
},

isPopular: {
type: Boolean,
default: false
},

videoLink: {
type: String,
default: ""
},

imageUrl: {
type: String,
default: ""
},

createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
}

}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);