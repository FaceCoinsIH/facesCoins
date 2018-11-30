const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const news = new Schema({
    title: String,
    description: String,
    content: String,
    date: String,

    image: String,
    url: String


}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});


const News = mongoose.model("News", news);

module.exports = News;