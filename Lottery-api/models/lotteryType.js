const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lotterySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    next_draw: {
        type: String
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('LotteryType', lotterySchema);