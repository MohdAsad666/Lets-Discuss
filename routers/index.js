const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require("../controllers/homeController")
router.get('/',passport.checkAuthentication,homeController.homepage);
router.use('/user',require("./user"));

module.exports = router;