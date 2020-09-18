const express = require('express');
const router = express.Router();
const passport = require('passport');
const PostController = require("../controllers/postController");
router.post('/create',PostController.create);

module.exports = router;