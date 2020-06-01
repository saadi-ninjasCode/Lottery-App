const mongoose = require('mongoose');

function arrayLimit(val) {
    return val.length <= 3;
}

const Schema = mongoose.Schema;
const usageBall = new Schema({
    lottery: {
        type: Schema.Types.ObjectId,
        ref: 'LotteryType'
    },
    coldBall: {
        type: [Number],
        required: true,
        validate: [arrayLimit, "{PATH} exceeds the limit of 3"]
    },
    hotBall: {
        type: [Number],
        required: true,
        validate: [arrayLimit, "{PATH} exceeds the limit of 3"]
    },
},
    { timestamps: true });

module.exports = mongoose.model("UsageBalls", usageBall)