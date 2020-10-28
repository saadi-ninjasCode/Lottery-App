const mongoose = require('mongoose');

// function dateLimit(val) {
//     if (val)
//         return val >= Date.now();
//     else
//         return true
// }

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