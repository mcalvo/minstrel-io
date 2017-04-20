var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Base for our name generator
// Types: title, latinTitle, adjective, locale, name, latinName, animal, weapon, bodyPart
// Words: String that the name portion represents
var nameSegmentSchema = new Schema({
    segmentType: { type: String, index: true, required: true },
    text: { type: String, required: true }
});

module.exports.nameSegmentSchema = nameSegmentSchema;
