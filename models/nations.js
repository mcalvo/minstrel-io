var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

//Base for our name generator
// Text: String
var nameSegmentSchema = new Schema({
    segmentType: { type: ObjectId, ref: 'NationSegmentType', index: true, required: true },
    nation: { type: ObjectId, ref: 'Nation', index: true, required: true },
    text: { type: String, required: true },
    notes: String
});

// Lesser Priority: Before word
// Equal Priority: interchangable
// Greater Priority: After word
var segmentTypeSchema = new Schema({
    priority: { type: String, required: true },
    text: { type: String, required: true }
});

// Country of origin
var nationSchema = new Schema({
    text: { type: String, required: true }
});


module.exports.NationNameSegment = mongoose.model("NationNameSegment", nameSegmentSchema);
module.exports.NationSegmentType = mongoose.model("NationSegmentType", segmentTypeSchema);
module.exports.Nation = mongoose.model("Nation", nationSchema);
