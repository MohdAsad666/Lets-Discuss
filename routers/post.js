const express = require('express');
const router = express.Router();
const passport = require('passport');
const PostController = require("../controllers/postController");
router.post('/create',passport.checkAuthentication,PostController.create);
router.get('/delete/:id',passport.checkAuthentication,PostController.destroy);

module.exports = router;