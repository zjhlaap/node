var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let multer = require("multer");
let fs = require("fs");
var bodyParser = require("body-parser");
let cookieSession = require('cookie-session');
let consolidate = require("consolidate");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(bodyParser());
app.use(cookieSession({
  name: 'node_id',
  keys: ['key1', 'key2'],//加密的一个复杂度  SHA1  一个必传参数
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('.html', require('ejs').__express);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.url.indexOf('product')!==-1){//根据请求地址的不同
      req.pp = path.join('./public','upload','product') + "/";
      req.ppp = path.join('/upload','product') + "/";
      cb(null, path.join(__dirname, 'public','upload','product'));//public/product
    }
    if(req.url.indexOf('user')!==-1){
      req.ppp = path.join('/upload','user') + "/";
      cb(null, path.join(__dirname, 'public','upload','user'))
    }
    if(req.url.indexOf('banner')!==-1){
      req.pp = path.join('./public','upload','banner') + "/";
      req.ppp = path.join('/upload','banner') + "/";
      cb(null, path.join(__dirname, 'public','upload','banner'))
    }

  }
})

var upload = multer({ storage:storage })

app.use(upload.any())
app.use("/api/login",require("./routes/api/login"));
// app.use("/",require("./routes/api/index"));
app.use("/api/banner",require("./routes/api/banner"));
app.use("/api/product",require("./routes/api/product"));
app.use("/api/addCart",require("./routes/api/addCart"));
app.use("/api/nav",require("./routes/api/nav"))
app.use("/api/detail",require("./routes/api/detail"))
app.use("/api/register",require("./routes/api/register"))
app.use("/api/cart",require("./routes/api/cart"));
app.use("/api/list",require("./routes/api/list"))



app.use("/admin/login",require("./routes/login"));
app.use("/admin/register",require("./routes/register"));
app.use("/admin/success",require("./routes/success"));
app.use("/admin/error",require("./routes/error"));

app.all("/admin/*",require("./routes/islogin"));
app.use('/admin', require("./routes/home"));
app.use('/admin/product', require("./routes/product"));
// app.use('/admin/product/follow', );
app.use('/admin/banner', require("./routes/banner"));
app.use("/admin/user",require("./routes/user"));
app.use("/admin/user/add",require("./routes/user/add"));
app.use("/admin/slideNav",require("./routes/slideNav"));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
