var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//來定義欲連線的資料庫
let db_config = {
  database: 'todo',
  host: 'localhost',
  user: 'root',
  password: ''
}

//去與資料庫建立連線                     與這個資料庫做連線
const connection = mysql.createConnection(db_config);

//做檢查
connection.connect(function (err) {
  if (err) {
    console.log('connecting error');
    return;
  }
  console.log('connecting success');
});

// 把 db 的連線綁定到 req 裡面
//我要在app use一個function，可以用use去綁定這個function
app.use(function(req, res, next) {
  // 本來req裡面沒有db這個屬性，所以去宣告db=connection
  req.db = connection; //呼叫const connection
  next();//呼叫下一個function
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
