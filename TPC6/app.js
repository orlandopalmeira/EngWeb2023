var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

// MONGODB
var mongoose = require('mongoose');
var mongodb = 'mongodb://127.0.0.1/Pessoas'
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
// Bind connection to error event (to get notification of conection erros)
db.on('error', console.error.bind(console, "MongoDB conection error.."))
db.once('open', function() {
    console.log("Conexao ao Mongo estabelecida com sucesso...")
})

// END OF MONGODB

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({erro: err});
});

module.exports = app;
