var express = require('express');
var router = express.Router();

var testCtrl = require('../controllers/test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/customer', function(req, res, next) {
  res.render('customer', { title: 'Customer' });
});

router.get('/management', function(req, res, next) {
  res.render('management', { title: 'Management' });
});

router.get('/solution', function(req, res, next) {
  res.render('solution', { title: 'Solution' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});



router.get('/menu1', function(req, res, next) {
  res.render('index', { title: '첫번째 메뉴' });
});

router.get('/menu2', testCtrl.test);

module.exports = router;
