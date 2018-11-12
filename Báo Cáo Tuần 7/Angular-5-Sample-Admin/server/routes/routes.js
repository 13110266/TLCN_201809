var express = require('express'),
  router = express.Router(),
  passwordHash = require('password-hash'),
  jwt = require('jsonwebtoken');
var router = express.Router();
var config = require('../config/config')


var user = require('../controllers/user.controllers.js');
var model = require('../models/user.model.js');

var User = require('../models/user.model');

//*====================/connect mongodb ======================
var connect = require('../config/db');
connect.open();

//*====================./ connect mongodb ======================*/
// APIs
router.route('/users').get(user.getAll);
router.route('/users/count').get(user.count);
router.route('/users').post(user.insert);
router.route('/users/:id').get(user.get);
router.route('/users/:id').put(user.update);
router.route('/users/:id').delete(user.delete);
router.route('/dangky').post(user.insert);







router.post('/register', function (req, res, next) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    address: req.body.address,
    role: req.body.role
  });
  console.log(user)
  user.save(function (err, result) {
    if (err) {
      console.log(err)
      console.log(result)
      return res.status(403).json({
        title: 'There was an issue',
        error: { message: 'The email you entered already exists' }
      });
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
});

// user login
router.post('/login', function (req, res, next) {
  User.findOne({ email: req.body.email.toLowerCase() }, function (err, doc) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!doc) {
      return res.status(403).json({
        title: 'Wrong Email or Password',
        error: { message: 'Please check if your password or email are correct' }
      })
    }
    if (!passwordHash.verify(req.body.password, doc.password)) {
      return res.status(403).json({
        title: 'You cannot log in',
        error: { message: 'Please check your password or email' }
      })
    }
    var token = jwt.sign({ user: doc }, config.secret, { expiresIn: config.jwtExpire });
    return res.status(200).json({
      message: 'Login Successfull',
      token: token,
      userId: doc._id,
      username: doc.username,
      role: doc.role
    })
  })
});
router.put('/edit/:id', function (req, res, next) {
  var user = {
    username: req.body.username,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    address: req.body.address,
    role:req.body.role
  };
  console.log(user)
  model.findOneAndUpdate({ _id: req.params.id },user, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
});


module.exports = router;
