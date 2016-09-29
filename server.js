var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure our app to handle CORS requests ?????
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// app.use(express.static(__dirname + '/public'));
app.use(express.static('./dist'));


app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'vuesAdmin',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 600000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

var apiRoutes = require('./app/data/user')(app, express);
app.use('/api', apiRoutes);

var apiRoutes = require('./app/data/test')(app, express);
app.use('/api', apiRoutes);


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.get('/user', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/user.html'));
});


app.listen(8080);
