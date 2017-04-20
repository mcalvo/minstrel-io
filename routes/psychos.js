var express = require('express');
var router = express.Router();
var models = require('../models/models')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('psychos-index', { title: 'Psycho Generator' });
});

/* GET name segments. */
router.get('/segments', function(req, res){
    var db = req.db;
    var NameSegment = models.NameSegment;

    NameSegment.find(function(e, segments){
        if (e) throw e;
        res.json(segments);
    });
});

module.exports = router;
