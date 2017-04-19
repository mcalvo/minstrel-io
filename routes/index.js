var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET Userlist page.*/
router.get('/userlist', function(req, res, next) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e, docs){
        res.render('userlist', {
            "title": "User List",
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res){
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    var db = req.db;

    // Get form values. Rely on 'name' attributes.
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var collection = db.get('usercollection')

    collection.insert({
        "username": userName,
        "email": userEmail,
    }, function(err, doc) {
        if (err) {
            res.send("There was a problem adding information to the db.");
        } else {
            res.redirect('userlist');
        }
    });
});

module.exports = router;