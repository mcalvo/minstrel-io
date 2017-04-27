var express = require('express');
var router = express.Router();
var models = require('../models/models')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('psychos-index', { title: 'Psycho Generator',  });
});

/* GET name segments. */
router.get('/segments', function(req, res){
    var db = req.db;
    var NameSegment = models.NameSegment;
    var SegmentType = models.SegmentType;

    NameSegment.find().populate('segmentType')
        .select('text segmentType _id')
        .exec(function(e, segments){
            if (e) throw e;
            res.json({'data': segments});
        });
});

/* GET name segment types. */
router.get('/segmentTypes', function(req, res){
    var db = req.db;
    var SegmentType = models.SegmentType;

    SegmentType.find().sort('priority').exec(function(e, segmentTypes){
        if (e) throw e;
        res.json({'data': segmentTypes});
    });
});

/* POST name segments */
router.post('/addsegment', function(req, res){
    var db = req.db;
    var NameSegment = models.NameSegment;

    var segment = new NameSegment(req.body).save(function(err){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});

/* GET name generation */
router.get('/name', function(req, res){
    var db = req.db;
    // Get list of Name Types
    var NameSegment = models.NameSegment;
    var SegmentType = models.SegmentType;

    SegmentType.find().select('text').exec(function(e, segmentTypes){
        if (e) throw e;
        var arrayRand = function(items){
            var int = Math.floor(Math.random()*items.length);
            var result = items.splice(int, 1);
            return result;
        };
        var typeSet = []
        var segCount = 2 + Math.floor(Math.random()*2);
        for (;segCount > 0; segCount--){
            // Pick a random segment type.
            rel_type = arrayRand(segmentTypes)[0];

            // Pick a random word of the selected type.
            NameSegment.find({ 'segmentType': rel_type._id }).exec(function(e, nameSegments){
                rand_word = arrayRand(nameSegments)[0];
                console.log(rand_word.text);
                //typeSet = typeSet.push(rand_word.text);
            });
        }
        // Display according to Priority
        res.json(typeSet);
    });


});

module.exports = router;
