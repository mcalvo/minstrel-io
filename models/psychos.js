var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

//Base for our name generator
// Types:  [adjective, title], locale, animal, name, [bodyPart,weapon]
// Text: String
var nameSegmentSchema = new Schema({
    segmentType: { type: ObjectId, ref: 'SegmentType', index: true, required: true },
    text: { type: String, required: true }
});

// Lesser Priority: After word
// Equal Priority: interchangable
// Greater Priority: Before word
var segmentTypeSchema = new Schema({
    priority: { type: String, required: true },
    text: { type: String, required: true }
});

module.exports.nameSegmentSchema = nameSegmentSchema;
module.exports.segmentTypeSchema = segmentTypeSchema;
