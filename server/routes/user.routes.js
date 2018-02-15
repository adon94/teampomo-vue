const express = require('express');
const Router = express.Router;
const UserController = require('../controllers/user.controller');
const router = new Router();

router.route('/users').get(UserController.getUsers);
router.route('/users/:id').get(UserController.getUser);
router.route('/users/team/:teamId').get(UserController.findByTeam);
router.route('/users/join').put(UserController.joinSession);
router.route('/users/signin').post(UserController.signIn);
router.route('/users').post(UserController.addUser);
router.route('/users').put(UserController.updateUser);
router.route('/users/:id').delete(UserController.deleteUser);

module.exports = router;
