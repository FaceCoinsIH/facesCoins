const express = require("express");
const router = express.Router();
const axios = require("axios");
const Event = require("../models/Events");
const Coin = require("../models/Coins");

router.get("/showEvent/:id", (req, res, next) => {
  var eventId = req.params.id;

  Event.findById(eventId).then(event => {
    res.render("event", event);
  });
});

router.get("/showCoin/:id", (req, res, nex) => {
  var coinId = req.params.id;

  Coin.findById(coinId).then(coin => {
    res.render("coin", coin);
  });
});

module.exports = router;
