var express = require('express');
var router = express.Router();

var userList = require('../data/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('users/index', {title: 'Users', users: userList});
});

router.get('/new', function(req, res) {
	res.render('users/new', {title: 'New Users'});
});

router.post('/', function(req, res){
	if (userList[req.body.username]) {
		res.send('Conflict', 409);
	} else {
		userList[req.body.username] = req.body;
		res.redirect('/users');
	}
});


router.get('/:name', function(req, res, next) {
	var user = userList[req.params.name];
	if (user) {
		res.render('users/profile', {title: 'User Profile', user: user});
	} else {
		next();
	}
});


module.exports = router;
