var express = require('express');
var path = require('path');
var session     = require('express-session');
var app = express();

var cookieParser =  require("cookie-parser");
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');



var connection = require('./app/config/db');
var routes = require('./app/routes/routes')(app,connection);
// create application/x-www-form-urlencoded parser

app.use(cookieParser('shhhh, very secret'));
app.use(session());

app.use(function(req, res, next){
    var err = req.session.error
        , msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});


app.listen(3001,function()
{
    console.log("It's Started on PORT 3001");
});