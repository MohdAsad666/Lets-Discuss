const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController")
router.get('/',homeController.homepage);
router.get('/sign-up',homeController.signUp);
router.post('/create',homeController.create);
router.get('/sign-in',homeController.signIn)
router.post('/createSession',homeController.createSession);
module.exports = router;