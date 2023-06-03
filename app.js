/*
  Filename: app.js;
  Author: Sau Han, Chan, & default;
  StudentID: 301276498;
  Date: 2023-06-02;
  Description: This is for configuring the whole express application (inc loading all the modules).
*/

//#To load all required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//#To import the index.js & user.js file from the routes directory
var indexRouter = require('./routes/index');

//#To create an instance of express application (for configuring the application and setting up routes)
var app = express();

//##view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//#To mount middleware functions to a non-specific path
app.use(logger('dev'));   
app.use(express.json());   
app.use(express.urlencoded({ extended: false }));   
app.use(cookieParser());   
app.use(express.static(path.join(__dirname, 'public')));   

app.use('/', indexRouter);     //#req to the root directory will be handled by indexRouter

//#For form submission
app.get('/',function(req,res,next){
  console.log(req.body);
});

//##catch 404 and forward to error handler (below)
app.use(function(req, res, next) {
  next(createError(404));
});

// ##error handler
app.use(function(err, req, res, next) {
  // ##set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // ##render the error page
  res.status(err.status || 500);
  res.render('error');
});

//#To export the Express application instance for other modules' use
module.exports = app;
