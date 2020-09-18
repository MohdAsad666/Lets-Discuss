const express = require('express');
const router = express.Router();
const passport = require('passport');
const PostController = require("../controllers/postController");
router.post('/create',passport.checkAuthentication,PostController.create);

module.exports = router;