const Session = require('../models/session');
const User = require('../models/user');

exports.getSessions = function (req, res) {
  Session.find().sort('-_id').exec((error, sessions) => {
    if (error) { console.error(error); }
    res.send({
      sessions: sessions
    })
  });
}

exports.findActiveSessions = function (req, res) {
  Session.find({ isActive: true, teamId: req.params.teamId }).sort('-dateAdded').exec((error, sessions) => {
    if (error) { console.error(error); }
    res.send({
      sessions: sessions
    })
  });
}

exports.addSession = function (req, res) {
  const db = req.db;
  const workMinutes = req.body.workMinutes;
  const breakMinutes = req.body.breakMinutes;
  const teamId = req.body.teamId;
  const createdById = req.body.createdById;

  const new_session = new Session({
    workMinutes,
    breakMinutes,
    teamId,
    createdById,
  });

  new_session.save(function (error, saved) {
    if (error) {
      console.log(error)
    } else {
      User.findById(createdById).exec((error, user) => {
        user.activeSessionId = saved._id;
        user.save(function (error, savedUser) {
          if (error) {
            console.log(error)
          } else {
            res.send({
              success: true,
              session: saved
            });
          }
        });
      });
    }
  });
}

exports.getSession = function (req, res) {
  var db = req.db;
  Session.findById(req.params.id).exec((error, session) => {
    if (error) { console.error(error); }
    res.send(session)
  })
}

exports.endSession = function (req, res) {
  var db = req.db;
  Session.findById(req.params.id).exec((error, session) => {
    if (error) { console.error(error); } else {
      session.isActive = false
      session.isPlaying = false
      session.save(function (error, saved) {
        if (error) {
          console.log(error)
        }
        res.send({
          session: saved,
          success: true
        })
      })
    }
  })
}

exports.updateSession = function (req, res) {
  var db = req.db;
  Session.findById(req.params.id).exec((error, session) => {
    if (error) { console.error(error); }

    session.firstName = req.body.firstName
    session.lastName = req.body.lastName
    session.save(function (error, saved) {
      if (error) {
        console.log(error)
      }
      res.send({
        session: saved,
        success: true
      })
    })
  })
}

exports.deleteSession = function (req, res) {
  var db = req.db;
  Session.remove({
    _id: req.params.id
  }, function (err, session) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
}

exports.deleteAllSessions = function (req, res) {
  var db = req.db;
  Session.remove({}, function (err, session) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
}