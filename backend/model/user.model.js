const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    profilePhoto: {
        filename: String,
        url: String
    },
    password: { type: String, require: true }
})

const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel };