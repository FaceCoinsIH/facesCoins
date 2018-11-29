const express = require("express");
const router = express.Router();
const axios = require("axios");
const Events = require("../models/Events");
const Coins = require("../models/Coins");
const Post = require("../models/Post");
const Comments = require("../models/Comments");
const uploadCloud = require("../config/cloudinary.js");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");




router.get("/showEvent/:id", ensureLoggedIn("/auth/login"), (req, res, next) => {
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

router.get("/createPost", ensureLoggedIn('/auth/login'), (req, res, next) => {

    res.render("createPost");

});

router.post("/createPost", uploadCloud.single("photo"), (req, res) => {

    const post = new Post({
        author: req.user.id,
        title: req.body.title,
        content: req.body.content,
        picPath: req.file.url,
        picName: req.file.originalname
    });


    post.save(err => {
        if (err) {
            next(null, false, { message: Post.errors });
        } else {
            res.redirect("/");
        }
    });
});


router.get("/viewPost/:id",ensureLoggedIn('/auth/login'), (req, res, next) => {
    var postId = req.params.id;

    Post.findById(postId)
        .populate('author')

        .populate('comments')
        .then(post=>{
            res.render('viewPosts',post);

        })
})



//   router.post("/new-comment",(req,res,next)=>{
//     const comment = new Comments({

//         title: req.body.title,
//         content: req.body.content,
//         author: req.user.id
//     });




//     comment.save()
//         .then(comment => {

//           return Post.findByIdAndUpdate(req.body.postId,{$push:{comments:comment._id}})

//         })
//         .then(() => {
//             res.redirect(`/viewPost/${req.body.postId}`);
//         })
//         .catch(err => console.log(err));
// })

 router.post("/new-comment",(req,res,next)=>{
    const comment = new Comments({

        title: req.body.title,
        content: req.body.content,
        author: req.user.id,
        post:req.body.postId
    });

    comment.save()
        .then(comment => {
          return Post.findByIdAndUpdate(req.body.postId,{$push:{comments:comment._id}})
        })
        .then(() => {
            Comments.find({post:req.body.postId})
            .then(comments=>{
                console.log("paint comments")
                comments.forEach(function(comment){
                    printComments(comment);
                })
            })
           
        })
        .catch(err => console.log(err));

 })



 function printComments(comment){
    
    var divcomment = document.createElement("div");
       divcomment.innerHTML = `
        <div class="comment-info">
            <div>${comment.title}</div>
            <div>${comment.content}</div>
        </div>`;
        document.querySelector(".comments-container").append(divcomment);
    }

module.exports = router;