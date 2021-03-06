var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var data = require('./routes/data');
var village = require('./routes/village');
var vpp = require('./routes/vpp');
var smg = require('./routes/smg');

var app = express();

var client = require('./connector/client');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('village', path.join(__dirname, 'views/village'));
app.set('vpp', path.join(__dirname, 'views/vpp'));
app.set('smg', path.join(__dirname, 'views/smg'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/data', data);
app.use('/village', village);
app.use('/vpp', vpp);
app.use('/smg', smg);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
