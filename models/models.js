var mongoose = require("mongoose");
var Users = require("./users");

var User = mongoose.model("User", Users.userSchema);

module.exports.User = User;
