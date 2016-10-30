var express = require('express');           /*Server Express*/
var bodyParser = require('body-parser');
var mongoose = require('mongoose');         /*Conexión con MongoDB*/
var io = require('socket.io');              /*Comunicación entre Master y Slave*/
/*Inicio Express*/
var app = express();
var server = require('http').Server(app);

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

//var passport = require('passport');

//require('./models/user');
//require('./passport')(passport);


/*Middlewares express*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* developing mode */
// use morgan to log requests to the console
var morgan      = require('morgan');
app.use(morgan('dev'));


//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
  next();
});


var users = require('./routes/users');
app.use('/server', users);



/*Views y HTML*/
app.use(express.static(__dirname + '/public'));



/*Conexión a la base de datos de MongoDB que tenemos en local*/
mongoose.Promise = global.Promise;
require('mongoose-middleware').initialize(mongoose);
mongoose.connect(config.database, function(err, res) {
    if (err) throw err;
    console.log('Conectado con éxito a la Base de Datos');
});
app.set('superSecret', config.secret);

// Start server
server.listen(config.port, function() {
    console.log("Servidor en http://localhost:" + config.port);
});



/* CAS REGISTRO Y AUTORIZACIÓN DE USUARIOS EN NODE.JS CON TWITTER Y FACEBOOK */

/* app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(express.session({ secret: 'secretkey' }));

// Configuración de Express
app.use(passport.initialize());
app.use(passport.session());
...
// Rutas de Passport
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', 
    failureRedirect: '/login' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', 
    failureRedirect: '/login' }));
...

exports.index = function(req, res){
  res.render('index', { 
    title: 'Passport-Example',
    user: req.user
  });
}; */



