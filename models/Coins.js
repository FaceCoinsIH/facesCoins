const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coins = new Schema({
    name: String,
    symbol: String,
    price_usd: String,
    market_cap_usd: String,
    percent_change_24h: String,
    percent_change_1h: String,
    percent_change_7d: String,
    fav_coin:{type:Boolean, default:false}

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});


const Coins = mongoose.model("Coins", coins);

module.exports = Coins;