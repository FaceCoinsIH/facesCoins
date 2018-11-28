const express = require("express");
const router = express.Router();
const axios = require("axios");
const Events = require("../models/Events");
const Coins = require("../models/Coins");
const Post = require("../models/Post");
const Comments = require("../models/Comments");
const uploadCloud = require("../config/cloudinary.js");




router.get("/showEvent/:id", (req, res, next) => {
    var eventId = req.params.id;

    Events.findById(eventId)
        .then(event => {
            res.render("event", event);
        })
        .catch(err => {
            console.error(err);
        })
});

router.get("/showCoin/:id", (req, res, next) => {
    var coinId = req.params.id;
    Coins.findById(coinId)
        .then((coin) => {
            console.log(coin, coin.name);
            res.render("coin", { coin, coinName: JSON.stringify(coin.symbol) });


        })
        .catch(err => { console.error(err) })

});

router.get("/createPost", (req, res, next) => {

    res.render("createPost");

});

router.post("/createPost", uploadCloud.single("photo"), (req, res) => {

    const post = new Post({
        author: req.user.id,
        title: req.body.title,
        content: req.body.content,
    });


    post.save(err => {
        if (err) {
            next(null, false, { message: Post.errors });
        } else {
            res.redirect("/");
        }
    });
});


router.get("/viewPost/:id", (req, res, next) => {
    var postId = req.params.id;

    Post.findById(postId)
        .populate('author')

        .populate('comments')
        .then(post=>{
            res.render('viewPosts',post);

        })
})



  router.post("/new-comment",(req,res,next)=>{
    const comment = new Comments({

        title: req.body.title,
        content: req.body.content,
        author: req.user.id
    });


    comment.save()
        .then(comment => {

          return Post.findByIdAndUpdate(req.body.postId,{$push:{comments:comment._id}})

        })
        .then(() => {
            res.redirect(`/viewPost/${req.body.postId}`);
        })
        .catch(err => console.log(err));
})

module.exports = router;