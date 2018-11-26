const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Post = mongoose.model("Post", post);

module.exports = Post;