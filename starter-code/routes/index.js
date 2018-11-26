const express = require('express');
const router = express.Router();

//MODELS
const Comments = require("../models/Comments");
const Post = require("../models/Post");
const User = require("../models/User");
const News = require("../models/News");

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});



module.exports = router;