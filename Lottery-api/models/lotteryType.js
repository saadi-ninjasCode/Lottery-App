const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lotterySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    next_draw: {
        type: Date,
        min: [Date.now(), "Date must be greater than current date & time"]
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('LotteryType', lotterySchema);