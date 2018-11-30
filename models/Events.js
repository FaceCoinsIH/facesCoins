const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const events = new Schema({
    name: String,
    id: String,
    description: String,
    city: String,
    country:String,
    address:String,
    location:[],
    sales: [],
    time_start: Date,
    time_end: Date,
    status:String,
    image:String

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});


const Events = mongoose.model("Events", events);

module.exports = Events;