var createError = require('http-errors'); // usa para tratamento de errod
var express = require('express'); // framework para atender pedidos
var path = require('path'); // abstrai o facto de trabalharmos em windows os linux
//var cookieParser = require('cookie-parser'); // não é necessário para já
var logger = require('morgan'); // faz logs automaticamente

var indexRouter = require('./routes/index'); // 
//var usersRouter = require('./routes/users'); // não é necessário se não houver utilizadores

var app = express(); // executa a aplicação

// view engine setup
app.set('views', path.join(__dirname, 'views')); // onde estão as views
app.set('view engine', 'pug'); // indica o motor de render que ele vai usar


//execução
// o pedido atravessa todas as funções abaixo até haver uma resposta a esse pedido
app.use(logger('dev')); // mostra na consola o pedido
app.use(express.json()); // são responsáveis por ver se há algo no body do pacote e colocar num campo body esses dados
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // configuração dos recursos estáticos (indica a pasta onde estão)

app.use('/', indexRouter); // se a rota for/começar com '/'
//app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
