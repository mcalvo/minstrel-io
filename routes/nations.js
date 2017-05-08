var express = require('express');
var router = express.Router();
var nations = require('../models/nations')
var Q = require('q')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('nations-index', { title: 'National NPC Generator',  });
});

/* GET name segments. */
router.get('/segments', function(req, res){
    var db = req.db;
    var NameSegment = nations.NationNameSegment;
    var SegmentType = nations.NationSegmentType;

    NameSegment.find().populate('segmentType nation')
        .select('text nation segmentType _id')
        .exec(function(e, segments){
            if (e) throw e;
            res.json({'data': segments});
        });
});

/* GET name segment types. */
router.get('/segmentTypes', function(req, res){
    var db = req.db;
    var SegmentType = nations.NationSegmentType;

    SegmentType.find().sort('priority').exec(function(e, segmentTypes){
        if (e) throw e;
        res.json({'data': segmentTypes});
    });
});

/* GET name segment types. */
router.get('/nationality', function(req, res){
    var db = req.db;
    var Nation = nations.Nation;

    Nation.find().exec(function(e, nations){
        if (e) throw e;
        res.json({'data': nations});
    });
});

/* POST name segments */
router.post('/addsegment', function(req, res){
    var db = req.db;
    var NameSegment = nations.NationNameSegment;

    console.log(req.body);

    var segment = new NameSegment(req.body).save(function(err){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

});

/* POST name segments */
router.delete('/deletesegment/:id', function(req, res){
    var db = req.db;
    var NameSegment = nations.NationNameSegment;
    NameSegment.findByIdAndRemove(req.params.id, function(err){
        res.send(
            (err === null) ? { msg: '' } : { msg: 'error: ' + err }
        );
    });
});

/* GET name generation */
router.get('/name', function(req, res){
    var db = req.db;
    // Get list of Name Types
    var NameSegment = nations.NationNameSegment;
    var SegmentType = nations.NationSegmentType;

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
        res.json(results.sort(function(a, b){
            return a.segmentType.priority - b.segmentType.priority;
        }));
    })
});

module.exports = router;
