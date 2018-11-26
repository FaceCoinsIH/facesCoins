const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    name: String,
    lastName: String,
    author: { type: Schema.Types.ObjectId, ref: 'Comments' }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const User = mongoose.model("User", user);

module.exports = User;