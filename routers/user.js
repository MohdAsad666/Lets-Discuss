const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require("../controllers/userController");
router.get('/profile/:id',userController.profile);
router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign-in',userController.signIn)
router.post('/createSession',passport.authenticate('local',{failureRedirect:'/user/sign-in'}),userController.createSession);
router.get('/sign-out',userController.destroySession);
router.use('/post',require("./post"));
router.use('/comment',require("./comment"));
module.exports = router;