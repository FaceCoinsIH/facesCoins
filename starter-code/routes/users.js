const express = require('express');
const router = express.Router();

//MODELS
const Comments = require("../models/Comments");
const Post = require("../models/Post");
const User = require("../models/User");
const News = require("../models/News");
const Coins = require("../models/Coins");




/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});





router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(x => {
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


// Coins.find().limit(1)
//     .then(coins => {
//         res.render('main', { coins });
//     })

router.get('/main', (req, res, next) => {
    var v_coins;
    Coins.find()
        .then(coins => {
            v_coins = coins;

            News.find().limit(3)
                .then(news => {
                    res.render('main', { news: news, coins: coins });
                })
                .catch(next)
        })

})


module.exports = router;