var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
// require('./db/mongo');
var createError = require('http-errors');

var app = express();

const {authenticateRoute} = require('./helpers');
global.appRoot = path.resolve(__dirname);
var indexRouters = require('./routes')
var beoforeAuthRouters = require('./routes/beforeauth')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    res.send('Server is alive')
})

app.use('/api/v1/auth',beoforeAuthRouters)
app.use('/api/v1',authenticateRoute,indexRouters)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send('Nothing is here')
});
  
// Error handler
app.use(function (err, req, res, next) {
  
    // Set locals, only providing error
    // in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
  
// module.exports = { app: app, server: server };
module.exports = app;