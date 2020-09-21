const express = require('express');
const router = express.Router();
const passport = require('passport');
const CommentController = require("../controllers/commentController");
router.post("/create",passport.checkAuthentication,CommentController.create);
router.get("/delete/:id",passport.checkAuthentication,CommentController.destroy);
module.exports = router;