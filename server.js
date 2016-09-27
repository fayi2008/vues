var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

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

var apiRoutes = require('./app/data/inface')(app, express);
app.use('/api', apiRoutes);

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
});



app.get('/user', function (req, res){
    res.sendFile(path.join(__dirname + '/public/user.html'));
});



app.listen(8081);
