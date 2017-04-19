var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
});

module.exports.userSchema = userSchema;
