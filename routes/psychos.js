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

    NameSegment.find()
        .select('text segmentType _id')
        .exec(function(e, segments){
            if (e) throw e;
            res.json({'data': segments});
        });
});

/* GET name segment types. */
router.get('/segmentTypes', function(req, res){
    var db = req.db;
    var NameSegment = models.NameSegment;

    NameSegment.find().distinct('segmentType', function(e, segmentTypes){
        if (e) throw e;
        res.json(segmentTypes);
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
    NameSegment.find().distinct('segmentType', function(e, sTypes){
        if (e) throw e;
        var arrayRand = function(items){
            var int = Math.floor(Math.random()*items.length);
            var result = items.splice(int, 1);
            return result;
        };
        var typeSet = []
        var segCount = 2 + Math.floor(Math.random()*2);
        for (;segCount > 0; segCount--){
            typeSet.push(arrayRand(sTypes)[0]);
        }
        typeSet.forEach(function(value){
            console.log(value);
        });
        res.json(typeSet);
    });


    // Pick 2-3 types.
    // Pick a random word of each type.
    // Present them in a random order.
});

module.exports = router;
