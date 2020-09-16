const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require("../controllers/homeController")
router.get('/',passport.checkAuthentication,homeController.homepage);
router.get('/sign-up',homeController.signUp);
router.post('/create',homeController.create);
router.get('/sign-in',homeController.signIn)
router.post('/createSession',passport.authenticate('local',{failureRedirect:'/sign-in'}),homeController.createSession);
module.exports = router;