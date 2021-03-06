var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('error', {
     message: err.message,
     error: err
   });
  });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
res.status(err.status || 500);
res.render('error', {
 message: err.message,
 error: {}
});
});

//app.locals.navitems = [
//  {link: 'Menu1', content: '1번 Menu'},
//  {link: 'Menu2', content: '2번 Menu'},
//  {link: 'boot', content: '예상 layout'}
//];

// for mongoose


var mongoose = require('mongoose');
mongoose.connect('mongodb://khercules:BigTeam1234@cluster0-shard-00-00-uif6b.mongodb.net:27017,cluster0-shard-00-01-uif6b.mongodb.net:27017,cluster0-shard-00-02-uif6b.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');


module.exports = app;
