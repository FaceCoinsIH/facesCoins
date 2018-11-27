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





router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(x => {
            console.log(x)
            Comments.remove({ author: req.params.id }, function(err, data) {
                if (err) {
                    res.send("Error");
                } else {
                    res.redirect('/')
                }
            })
        })
        .catch(err => console.log(err));
})

router.get('/main', (req, res) => {
    res.render('auth/main');
})

module.exports = router;