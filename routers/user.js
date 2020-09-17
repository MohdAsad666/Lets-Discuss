const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require("../controllers/userController");
// router.get('profile',user.controller)
router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign-in',userController.signIn)
router.post('/createSession',passport.authenticate('local',{failureRedirect:'/user/sign-in'}),userController.createSession);
router.get('/sign-out',userController.destroySession);
module.exports = router;