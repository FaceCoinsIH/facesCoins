const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    confirmationCode: { type: String, unique: true },
    status: { type: String, enum: ['Pending Confirmation', 'Active', 'Pending Confirmation'], default: 'Pending Confirmation' },


    image: String,
    fav_coins: [{ type: Schema.Types.ObjectId, ref: 'Coins', unique: true }]





}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const User = mongoose.model("User", user);

module.exports = User;