const express = require('express');
const router = express.Router();

//MODELS
const Comments = require("../models/Comments");
const Post = require("../models/Post");
const User = require("../models/User");
const News = require("../models/News");
const Coins = require("../models/Coins");
const Events = require("../models/Events");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");


router.get('/', (req, res, next) => {
    res.redirect('/auth/login');
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



router.get('/main',ensureLoggedIn('/auth/login'),(req, res, next) => {
    var v_coins;
    Coins.find()
        .then(coins => {
            v_coins = coins;

            News.find().limit(3)
                .then(news => {
                    
                    Events.find().limit(4)
                    .then(events =>{
                        res.render('main', { news: news, coins: coins, events: events });
                    }) 
                })
                .catch(next)
        })
})

router.get('/coin', ensureLoggedIn('/auth/login'), (req, res, next) => {
    res.render('coin');
})



module.exports = router;