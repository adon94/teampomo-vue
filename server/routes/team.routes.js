const express = require('express');
const Router = express.Router;
const TeamController = require('../controllers/team.controller');
const router = new Router();

router.route('/teams').get(TeamController.getTeams);
router.route('/teams/:id').get(TeamController.getTeam);
router.route('/teams').post(TeamController.addTeam);
router.route('/teams/join').post(TeamController.joinTeam);
router.route('/teams/:id').put(TeamController.updateTeam);
router.route('/teams/:id').delete(TeamController.deleteTeam);
router.route('/teams/find/:teamName').get(TeamController.findTeams)

module.exports = router;
