const express = require("express");
const router = express.Router();
require("dotenv").config();
const NEWS_KEY = process.env.NEWS_KEY;
const News = require("../models/News");

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_KEY);

router.get("/getCripto", (res, req, next) => {
  newsapi.v2
    .topHeadlines({
      sources: "crypto-coins-news"
      
    })
    .then(response => {

       // console.log(response.articles);
        insertNews(response.articles);
    });
});




function insertNews(array_data){

  array_data.forEach(function(element){
    const newNews = new News({
      title: element.title,
      description: element.description,
      content: element.content,
      date: element.publishedAt,
      image: element.urlToImage,

    });

    newNews.save()
    .then(() => {
     // res.redirect("/");
     console.log("New added");
    })
    .catch(err => {
      //res.render("auth/signup", { message: "Something went wrong" });
      console.log("Error");
    })

    
 })
  


}

module.exports = router;
