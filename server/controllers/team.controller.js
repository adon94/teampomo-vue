const Team = require('../models/team');
const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs')

exports.getTeams = function (req, res) {
  Team.find().sort('-dateAdded').exec((err, teams) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ teams });
  });
}

exports.joinTeam = function (req, res) {
  console.log(req)
  var db = req.db;
  Team.findById(req.body.team._id).exec((err, team) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!team) {
      return res.status(404).json({
        error: true,
        message: 'Team not found'
      });
    }

    bcrypt.compare(req.body.form.accessPassword, team.accessPassword,
      (err, valid) => {
        if (!valid) {
          return res.status(404).json({
            error: true,
            message: 'Password is incorrect'
          });
        } else {
          const user = addToTeam(req.body.userId, team._id);
          res.json({ team, user });
        }
      });
  });
}

function addToTeam(userId, teamId) {
  User.findById(userId).exec((error, user) => {
    if(user) {
      user.teamId = teamId;
      user.save(function (error, saved) {
        console.log(error);
        if (error) {
          return error;
        } else {
          return saved;
        }
      });
    } else {
      return error;
    }
  });
}

exports.addTeam = function (req, res) {
  const db = req.db;
  const companyName = req.body.companyName;
  const teamName = req.body.teamName;
  const createdById = req.body.createdById;
  const salt = bcrypt.genSaltSync(10);
  const accessPassword = bcrypt.hashSync(req.body.accessPassword.trim(), salt);
  const new_team = new Team({
    companyName,
    teamName,
    accessPassword,
    createdById,
  });

  new_team.save(function (error, saved) {
    if (error) {
      console.log(error)
    }
    const user = addToTeam(saved.createdById, saved._id);
    res.send({
      user,
      success: true,
      team: saved
    });
  });
}

exports.getTeam = function (req, res) {
  var db = req.db;
  Team.findById(req.params.id).exec((error, team) => {
    if (error) { console.error(error); }
    res.send(team)
  })
}

exports.findTeams = function (req, res) {
  var db = req.db;
  Team.find({
    teamName: new RegExp(req.params.teamName, "i")
  }).
  limit(10).
  exec((error, teams) => {
    if (error) {
      console.error(error); 
    } else {
      console.error(teams); 
      res.send(teams)
    }
  });
}

exports.updateTeam = function (req, res) {
  var db = req.db;
  Team.findById(req.params.id).exec((error, user) => {
    if (error) { console.error(error); }

    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
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

exports.deleteTeam = function (req, res) {
  var db = req.db;
  Team.remove({
    _id: req.params.id
  }, function (err, team) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
}