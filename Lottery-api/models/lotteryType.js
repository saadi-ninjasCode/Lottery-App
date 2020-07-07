const mongoose = require('mongoose');

function dateLimit(val) {
    return val >= Date.now();
}

function arrayLimit(val) {
    return val.length <= 3;
}

const Schema = mongoose.Schema;
const lotterySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    next_draw: {
        type: Date,
        // validate: [dateLimit, "Date must be greater than current date & time"],
    },
    icon_name: {
        type: String
    },
    coldBall: {
        type: [
            {
                ball: String,
                times: String,
            }
        ],
        validate: [arrayLimit, "{PATH} exceeds the limit of 3"]
    },
    hotBall: {
        type: [
            {
                ball: String,
                times: String,
            }
        ],
        validate: [arrayLimit, "{PATH} exceeds the limit of 3"]
    },
    user_list: [
        {
            type: Schema.Types.ObjectId,
            rel: 'User'
        }
    ]
},
    { timestamps: true }
);

module.exports = mongoose.model('LotteryType', lotterySchema);