var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
});

userSchema.method('greet', function(){
    if(this.username) {
        return "I am called" + this.username;
    } else {
        return "I have no name";
    }
});

module.exports.userSchema = userSchema;
