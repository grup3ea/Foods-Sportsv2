var express = require('express');
var app = express();
var router = express.Router();
var User = require('../models/user.js');


var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable


//GET - GET All Users By Into DB
router.get('/users', function (req, res) {
    //console.log('GET list of all users');
/*    var recibido = req.body;
    console.log(recibido);*/
    User.find(function (err, users) {
        if (err) res.send(500, err.message);
        //console.log(users);
        res.status(200).jsonp(users);
        //console.log('\n');
    });

});

//POST - Add User in DB
router.post('/users/register', function (req, res) {
    console.log('Register User');
    console.log(req.body);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        description: req.body.description,
        avatar: req.body.avatar
    });
    //console.log('\n');
    console.log("Devuelve el user registrado");
    user.save(function (err, user) {
        if (err) return res.status(500).send(err.message);
        //console.log(user);
        res.status(200).jsonp(user);
    });
});

//POST - Comprovar user en DB
router.post('/users/login', function (req, res) {

  // find the user
    User.findOne({
      name: req.body.name
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

  			//req.body.password=md5(req.body.password);

        // check if password matches
        console.log(user.password);
        console.log(req.body.password);
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('superSecret'), {
            //expiresInMinutes: 1440 // expires in 24 hours
  		  //expiresIn: '60m'
          });
  				user.token=token;
  				user.save(function(err, user) {
  					if(err) return res.send(500, err.message);
  					//res.status(200).jsonp(travel);
  					console.log(user);
  	        // return the information including token as JSON
  					user.password="";
  	        res.json({
  	          success: true,
  	          message: 'Enjoy your token!',
  	          token: token,
  					  avatar: user.avatar,
  					  userid: user._id,
  						userdata: user
  	        });
  				});

        }

      }

    });
});
module.exports = router;
