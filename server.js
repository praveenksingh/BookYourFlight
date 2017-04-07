var app = require('./express');
require("./congigurations");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(app.express.static(__dirname + '/public'));

require ("./mongo/app.js")();
var project = require("./project/app.js");
project(app);

var port = process.env.PORT || 3000;

app.listen(port);

