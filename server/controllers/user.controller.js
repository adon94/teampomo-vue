const User = require('../models/user');
const Session = require('../models/session');
const bcrypt = require('bcrypt-nodejs')

//User Routes
exports.getUsers = function (req, res) {
  User.find().sort('-_id').exec((error, users) => {
    if (error) { console.error(error); }
    res.send({
      users: users
    })
  });
}

exports.signIn = function (req, res) {
  var db = req.db;
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }
    bcrypt.compare(req.body.password, user.password,
      (err, valid) => {
        if (!valid) {
          return res.status(404).json({
            error: true,
            message: 'Password is incorrect'
          });
        } else {
          res.json({ user });
        }
      });
  });
}

exports.findByTeam = function (req, res) {
  var db = req.db;
  User.find({ teamId: req.params.teamId }).exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!users) {
      return res.status(404).json({
        error: true,
        message: 'Users not found'
      });
    } else {
      res.json({ users });
    }
  });
}

exports.addUser = function (req, res) {
  const db = req.db;
  const email = req.body.email;
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(req.body.password.trim(), salt);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const new_user = new User({
    firstName,
    lastName,
    email,
    password
  });

  new_user.save(function (error, saved) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      user: saved
    });
  });
}

exports.getUser = function (req, res) {
  var db = req.db;
  User.findById(req.params.id).exec((error, user) => {
    if (error) { console.error(error); }
    res.send(user)
  })
}

exports.updateUser = function (req, res) {
  var db = req.db;
  User.findById(req.body._id).exec((error, user) => {
    if (error) { console.error(error); }

    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.activeSessionId = req.body.activeSessionId;
    user.save(function (error, saved) {
      if (error) {
        console.log(error)
      }
      res.send({
        user: saved,
        success: true
      })
    })
  })
}

exports.joinSession = function (req, res) {
  var db = req.db;
  User.findById(req.body._id).exec((error, user) => {
    if (error) { console.error(error); }

    user.activeSessionId = req.body.activeSessionId;
    user.save(function (error, saved) {
      if (error) {
        console.log(error)
      }
      Session.findById(user.activeSessionId).exec((error, session) => {
        if (error) { console.error(error); }
        res.send(session)
      });
    });
  });
}

exports.deleteUser = function (req, res) {
  var db = req.db;
  User.remove({
    _id: req.params.id
  }, function (err, user) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
}