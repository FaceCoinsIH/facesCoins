const express       = require("express");
const News          = require("../models/News");
const Coins         = require("../models/Coins");
const Events        = require("../models/Events");
const CoinMarketCap = require("node-coinmarketcap");
const NewsAPI       = require("newsapi");
const ticketmaster  = require('ticketmaster')
const router        = express.Router();
const axios           = require('axios')
require("dotenv").config();
const NEWS_KEY = process.env.NEWS_KEY;
const TICKET_KEY = process.env.TICKET_KEY;


const coinmarketcap = new CoinMarketCap();
const newsapi = new NewsAPI(NEWS_KEY);


router.get("/getCripto", (res, req, next) => {

  axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=R1eBWA9UAWncloxXZkzmuwKnv8riAxEp&keyword=blockChain&size=5')
  .then(function (response) {
    // console.log("AQUIIIIIIIIIIIII EMPIEZAAAAAAA")
     //console.log(response.data._embedded.events[0].name);
    insertEvents(response.data._embedded.events);
  })
  .catch(function (error) {
    console.log(error);
  });


  //  coinmarketcap.multi(coins => {
  //   insertCoins(coins.getTop(6));

  //   });
  // newsapi.v2
  //   .topHeadlines({
  //     sources: "crypto-coins-news"
      
  //   })
  //   .then(response => {
  //     coinmarketcap.multi(coins => {
  //       // Prints information about top 10 cryptocurrencies
  //     });
      
  //      // console.log(response.articles);
  //       insertNews(response.articles);
  //   });
});





function insertNews(array_news){

  array_news.forEach(function(element){
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

function insertCoins(array_coins){
  array_coins.forEach(function(element){
    const newCoin = new Coins({
      name: element.name,
      symbol: element.symbol,
      price_usd: element.price_usd,
      market_cap_usd: element.market_cap_usd,
      percent_change_24h:element.percent_change_24h,
      percent_change_1h:element.percent_change_1h,
      percent_change_7d:element.percent_change_7d
    });

    newCoin.save()
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

function insertEvents(array_events){
 

  array_events.forEach(function(element){
    console.log("function eventsssss", element.name);

   var name= element.name;
   var id= element.id;
   var  description= element.description;
   var  city= element.place.city.name;
   var  country=element.country.name;
   var  address=element.address.line1;
   var   location=[element.location.latitude,element.location.longitude];
   var   sales= [element.public.startDateTime,element.public.endDateTime];
  
    const newEvent = new Events({

      
    });
  })


  // newEvent.save()
  // .then(() => {
  //  // res.redirect("/");
  //  console.log("New added");
  // })
  // .catch(err => {
  //   //res.render("auth/signup", { message: "Something went wrong" });
  //   console.log("Error");
  // })

}

module.exports = router;
