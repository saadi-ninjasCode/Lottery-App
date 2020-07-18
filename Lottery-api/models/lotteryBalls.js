const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const lotteryBalls = new Schema({
    lottery: {
        type: Schema.Types.ObjectId,
        ref: 'LotteryType'
    },
    date: {
        type: Date,
        default: function () {
            return Date.now();
        }
    },
    balls: {
        type: [String],
    },
    specialBalls: [String],
    pending: {
        type: Boolean,
        default: false,
        required: true
    }
},
    { timestamps: true }
);
lotteryBalls.pre('validate', function (next) {
    if (this.date >= Date.now()) {
        throw new Error("Lottery date cann't exceed current date.");
    }
    else
        next();
});
module.exports = mongoose.model('LotteryBalls', lotteryBalls);