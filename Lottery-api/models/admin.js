const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Admin = new Schema({
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
        required: true,
    },
    role: {
        type: String,
        lowercase: true,
        trim: true
    }
});

module.exports = mongoose.model('Admin', Admin)