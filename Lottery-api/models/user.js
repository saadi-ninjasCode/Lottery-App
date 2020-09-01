const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: ''
    },
    notificationToken: {
        type: String
    },
    lotteries: [String]
});

module.exports = mongoose.model('User', User)