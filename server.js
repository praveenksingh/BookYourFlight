var express = require('express');
global.request = require('request');
var app = express();

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
// app.use(request);

global.apiPath = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=API_KEY";
// var key = process.env.GOOGLE_KEY ||"AIzaSyDKbf5xMjHgx2AxbT8XYiemow5DPfBEj0I";
var key = process.env.GOOGLE_KEY ||"AIzaSyB0Qaqmq90cU-511qA7AterDFbNrMvUwtU";
apiPath = apiPath.replace("API_KEY", key);


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var project = require("./project/app.js");
project(app);

var port = process.env.PORT || 3000;

app.listen(port);

