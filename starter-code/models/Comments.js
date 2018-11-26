const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comments = new Schema({
    title: String,
    content: String,
    comments: String,
    author: { type: Schema.Types.ObjectId, ref: 'Post' }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});


const Comments = mongoose.model("Comments", comments);

module.exports = Comments;