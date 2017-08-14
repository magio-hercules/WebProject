var express = require('express');
//var dialog = require('dialog');
//const { dialog } = require('electron');

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

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'LogIn' });
});



router.get('/menu1', function(req, res, next) {
  res.render('index', { title: '첫번째 메뉴' });
});

router.get('/menu2', testCtrl.test);


////////////////////////////////////////////////////////////////////
// test

var mongoose = require('mongoose');

//define scheme
var userSchema = mongoose.Schema({
    id: String,
    name: String,
    phone: String,
    gender: String,
    age: String
});

//create model with mongodb collection & scheme
var User = mongoose.model('customers', userSchema);

router.post('/insert', function(req, res, next) {
      var id = req.body.id;
      var name = req.body.name;
      var phone = req.body.phone;
      var gender = req.body.gender;
      var age = req.body.age;
      
      var user = new User({'id':id,'name':name, 'phone':phone, 'gender':gender,'age':age});
      user.save(function(err,silence){
             if(err){
                console.log(err);
                res.status(500).send('update error');
                return;
             }
//             res.status(200).send("Inserted");
             res.render('login', { title: '회원 등록'});
         });
});

router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    var user = User.find({'id':id});
    user.remove(function(err){
           if(err){
              console.log(err);
              res.status(500).send('update error');
              return;
           }
           res.status(200).send("Removed");
          
       });
});

router.post('/update', function(req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    var phone = req.body.phone;
    var gender = req.body.gender;
    var age = req.body.age;
    User.findOne({'id':id},function(err,user){
         if(err){
             console.log(err);
             res.status(500).send('update error');
             return;
        }
         user.name = name;
         user.phone = phone;
         user.gender = gender;
         user.age = age;
         user.save(function(err,silence){
                if(err){
                   console.log(err);
                   res.status(500).send('update error');
                   return;
                }
                res.status(200).send("Updated");
               
            });
    });
});

router.get('/get', function(req, res, next) {
    db = req.db;
    var id = req.query.id
    User.findOne({'id':id},function(err,doc){
         if(err) console.log('err');
          res.send(doc);
//         #('name').text = doc.name;
//         doc.getElementById('name').text = doc.name;
    });
});

router.get('/list', function(req, res, next) {
    User.find({},function(err,docs){
         if(err) {
           console.log('err');
         }
         res.render('login', { title: '회원 등록', customers:docs });
    });
});

module.exports = router;
