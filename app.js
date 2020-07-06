var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const cors = require('cors')



var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var expRouter = require('./routes/experiences')
var reviewRouter = require('./routes/review')
var tagRouter = require('./routes/tag')
var errorRouter = require('./routes/error')
var testRouter = require('./routes/test')

var app = express();

const mongoose = require("mongoose");
const { errorHandler } = require('./controllers/errorController');
require("dotenv").config({ path: ".env" });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())


mongoose.connect(process.env.DB, {
  // some options to deal with deprecated warning, you don't have to worry about them.
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log("connected to database"))



// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/experiences', expRouter);
app.use('/reviews', reviewRouter);
app.use('/tags', tagRouter);
app.use('/test', testRouter);
app.use(errorRouter)

//errror Handler
app.use(errorHandler)


// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
