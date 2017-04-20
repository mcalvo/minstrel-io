var mongoose = require("mongoose");
var Users = require("./users");
var Psychos = require("./psychos");

var User = mongoose.model("User", Users.userSchema);
var NameSegment = mongoose.model("NameSegment", Psychos.nameSegmentSchema);

module.exports.User = User;
module.exports.NameSegment = NameSegment;
