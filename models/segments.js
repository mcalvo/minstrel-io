var mongoose = require("mongoose");
var extend = require('mongoose-schema-extend');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


//Base for our name generators
var nameSegmentSchema = new Schema({
    segmentType: { type: ObjectId, ref: 'BaseSegmentType', index: true, required: true },
    text: { type: String, required: true }
    },
    { collection: 'basenamesegments', discriminatorKey: '_app'}
);

// Lesser Priority: Before word
// Equal Priority: interchangable
// Greater Priority: After word
var segmentTypeSchema = new Schema({
    priority: { type: Number, required: true },
    text: { type: String, required: true }
    },
    { collection: 'basesegmenttypes', discriminatorKey: '_app'}
);

module.exports.nameSegmentSchema = nameSegmentSchema;
module.exports.segmentTypeSchema = segmentTypeSchema;
