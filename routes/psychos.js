var express = require('express');
var router = express.Router();
var models = require('../models/models')
var Q = require('Q')

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
    /*
    SegmentType.find().select('text').exec(function(e, segmentTypes){
        if (e) throw e;
        var arrayRand = function(items){
            var int = Math.floor(Math.random()*items.length);
            var result = items.splice(int, 1);
            return result[0];
        };
        var typeSet = []
        var segCount = 2 + Math.floor(Math.random()*2);
        for (;segCount > 0; segCount--){
            // Pick a random segment type.
            var rel_type = arrayRand(segmentTypes);

            // Pick a random word of the selected type.
            NameSegment.find({ 'segmentType': rel_type._id }).exec(function(e, nameSegments){
                rand_word = arrayRand(nameSegments);
                console.log(rand_word.text);
                //typeSet = typeSet.push(rand_word.text);
            });
        }
        // Display according to Priority
        res.json(typeSet);
    });
    */
    var arrayRand = function(items, nums){
        var result = []
        for(var i = 0; i < nums; i++){
            var int = Math.floor(Math.random()*items.length);
            result.push(items.splice(int, 1)[0]);
        }
        return result;
    };

    typeSet = []
    SegmentType.find().then(function(segmentTypes){
        promiseSet = []

        var segCount = 2 + Math.floor(Math.random()*2);
        var rel_types = arrayRand(segmentTypes, segCount);

        rel_types.forEach(function(rel_type){
            var deferred = Q.defer();

            NameSegment.find({ 'segmentType': rel_type._id }).populate('segmentType').exec(function(e, nameSegments){
                var rand_word = arrayRand(nameSegments, 1)[0];
                typeSet.push(rand_word);
                return deferred.resolve(rand_word);
            });
            promiseSet.push(deferred.promise);
        });
        return Q.all(promiseSet);
    }).then(function(results){
        console.log(results);
        res.json(typeSet);
    })
});

module.exports = router;
