const express = require('express');
const Router = express.Router;
const SessionController = require('../controllers/session.controller');
const router = new Router();

router.route('/sessions').get(SessionController.getSessions);
router.route('/sessions/:id').get(SessionController.getSession);
router.route('/sessions/active/:teamId').get(SessionController.findActiveSessions);
router.route('/sessions').post(SessionController.addSession);
router.route('/sessions').put(SessionController.updateSession);
router.route('/sessions/end/:id').put(SessionController.endSession);
router.route('/session/:id').delete(SessionController.deleteSession);
router.route('/sessions/all').delete(SessionController.deleteAllSessions);

module.exports = router;
