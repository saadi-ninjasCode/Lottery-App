const mongoose = require('mongoose');

function dateLimit(val) {
    return val >= Date.now();
}
const Schema = mongoose.Schema;

const lotterySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    next_draw: {
        type: Date,
        validate: [dateLimit, "Date must be greater than current date & time"],
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('LotteryType', lotterySchema);