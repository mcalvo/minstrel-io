var express = require('express');
var router = express.Router();
var models = require('../models/models')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET Userlist page.*/
router.get('/userlist', function(req, res, next) {
    var db = req.db;
    var User = models.User;

    // Get all the users. We could probably filter later.
    User.find({},function(e, users){
        if (e) throw e;

        res.render('userlist', {
            "title": "User List",
            "userlist" : users
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

    var User = models.User;

    // Create User in memory
    var user = new User({
        "username": userName,
        "email": userEmail,
    });

    // Save to database
    user.save(function(err) {
        if (err) {
            res.send("There was a problem adding information to the db.");
        } else {
            res.redirect('userlist');
        }
    });
});

module.exports = router;
