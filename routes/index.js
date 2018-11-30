const express = require("express");
const router = express.Router();
const axios = require("axios");
const Events = require("../models/Events");
const Coins = require("../models/Coins");
const Post = require("../models/Post");
const Comments = require("../models/Comments");
const User = require("../models/User");

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






 router.post("/new-comment",(req,res,next)=>{
    const comment = new Comments({

        title: req.body.title,
        content: req.body.content,
        author: req.user.id,
        post:req.body.postId
    });



   comment.save()
        .then(comment => {
           Post.findByIdAndUpdate(req.body.postId,{$push:{comments:comment._id}})
           .then(() => Comments.findOne(comment._id).populate('author').then(comment => res.json(comment)));
        })
        
        .catch(err => console.log(err));
 })



 router.get("/profile",ensureLoggedIn('/auth/login'),(req,res,next)=>{
     User.findById(req.user.id)
        .populate("fav_coins")
        .then(user=>{
            res.render("profile", user);
        })
        .catch(err=> console.error(err))
    
 })


 router.post("/new-like",(req,res,next)=>{
     
     User.findByIdAndUpdate(req.user.id,{$push:{fav_coins:req.body.coin}})
     .then(()=>{
         console.log(req.body.coin);
         Coins.findOneAndUpdate({_id:req.body.coin},{ $set: {fav_coin: true} }, { new: true })
         .then(()=>{})
         .catch(err=>{console.error(err)})
     })
     .catch((err=>console.error(err)))
 })

 router.post("/delete-like",(req,res,next)=>{
    
     User.findByIdAndUpdate( { _id: req.user.id },{ "$pull": { fav_coins: req.body.coin } })
     .then(()=>{
        Coins.findOneAndUpdate(req.body.coin,{ $set: {fav_coin: false} }, { new: true })
        .then(coin=> res.json(req.body.coin))
        .catch(err=>{console.error(err)})
        
     })
     .catch(err=>{console.error(err)})
 })


 router.post("/change-data", uploadCloud.single("photo"), (req,res,next)=>{
    
    if(req.body.username !== ""){
       User.findOne({username:req.body.username})
        .then(foundUser=>{
            if (foundUser !== null) {
                res.redirect("/profile")
            }else{
                User.findOneAndUpdate({_id:req.user.id}, { $set: {username: req.body.username} }, { new: true })
                .then(user=>{
                    res.redirect("/profile");
                })
                .catch(err=>console.error(err))
            }
        })
    }
    
    
    if(req.body.password !== ""){
        User.findOne({username:req.body.username})
        .then(foundUser=>{
            if (foundUser !== null) {
                User.findOneAndUpdate({_id:req.user.id}, { $set: {password: req.body.password} }, { new: true })
                .then(user=>{
                    res.redirect("/profile");
                })
                .catch(err=>console.error(err))
            }
        })
    }

    if(req.body.email !== ""){
        User.findOne({email:req.body.email})
        .then(foundUser=>{
            if (foundUser !== null) {
                res.redirect("/profile");
            }else{
                User.findOneAndUpdate({_id:req.user.id}, { $set: {email: req.body.email} }, { new: true })
                .then(user=>{
                    res.redirect("/profile");
                })
                .catch(err=>console.error(err))
            }
        })
    }



    if(req.file.url !== ""){
        User.findOneAndUpdate({_id:req.user.id}, { $set: {image: req.file.url} }, { new: true })
        .then(user=>{
            res.redirect("/profile");
        })
        .catch(err=>console.error(err))
    }

   
 })


function update(val_find,value,element){
    User.findOneAndUpdate({val_find}, { $set: {element: value} }, { new: true })
    .then(user=>{
        res.redirect("/profile");
    })
    .catch(err=>console.error(err))
}


module.exports = router;