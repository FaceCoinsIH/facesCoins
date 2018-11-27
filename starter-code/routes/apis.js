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
  console.log('Hacemos peticiones iniciales a la base de datos');

  /* get Events, Ticketmaster */

   axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=R1eBWA9UAWncloxXZkzmuwKnv8riAxEp&keyword=blockChain&size=5')
    .then(function (response) {
  insertEvents(response.data._embedded.events);
  })
  .catch(function (error) {
    console.log(error);
  });


   /* get Coins, CoinMarket */
   coinmarketcap.multi(coins => {
    insertCoins(coins.getTop(6));
  });

   /* get News, News Api */
   newsapi.v2.topHeadlines({
      sources: "crypto-coins-news"   
  })  
  .then(response => {
    insertNews(response.articles);
  });


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
     console.log("New News added");
    })
    .catch(err => {
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
     console.log("New Coin added");
    })
    .catch(err => {
      console.log("Error");
    })

    
 })
}

function insertEvents(array_events){
 

  array_events.forEach(function(element){
    var newEvent = new Events({
       name: element.name,
       id: element.id,
       description: element.description,
       city: element.place.city.name,
       country:element.place.country.name,
       address:element.place.address.line1,
       location:[element.place.location.latitude,element.place.location.longitude],
       sales: [element.sales.public.startDateTime,element.sales.public.endDateTime],
      
    });

    newEvent.save()
    .then(() => {
     console.log("New event added");
    })
    .catch(err => {
      console.log("Error");
    })
  })


 

}

module.exports = router;
