const LotteryType = require('../../models/lotteryType');
const User = require('../../models/user')
const lotteryBalls = require('../../models/lotteryBalls');


const lotteryById = async (lotteryids) => {
    try {
        if (Array.isArray(lotteryids)) {
            const lottery = await LotteryType.find({ _id: { $in: lotteryids } });
            return lottery.map(lott => {
                return lotteryTypeTransformation(lott);
            })
        }
        else {
            const lottery = await LotteryType.findById(lotteryids);
            return lotteryTypeTransformation(lottery);
        }
    }
    catch (e) {
        console.log(e)
        throw e;
    }
};

const lotteryTypeTransformation = lottery => {
    return {
        ...lottery._doc,
        _id: lottery.id,
        // next_draw: dateToString(lottery._doc.next_draw),
        // user_list: lottery.user_list.length
        user_list: userById(lottery.user_list)

    };
};
const summaryTransformation = async lottery => {
    const drawBall = await lotteryBalls.find({ lottery: lottery.id }).sort({ date: -1 }).limit(1)
    return {
        lottery: {
            ...lottery._doc,
            _id: lottery.id,
            user_list: userById(lottery.user_list)
        },
        draw: drawBall[0]
    };
};

const userById = async (userids) => {
    try {
        if (Array.isArray(userids)) {
            const users = await User.find({ _id: { $in: userids } })
            return users.map(user => {
                return userTransformation(user)
            })
        }
        else {
            const user = await User.findById(userids)
            return userTransformation(user)
        }
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}

const userTransformation = user => {
    return {
        ...user._doc,
        _id: user.id,
    }
}

const lotterBallsTransformation = async ball => {
    return {
        ...ball._doc,
        _id: ball.id,
        lottery: lotteryById(ball._doc.lottery),
    }
}



exports.transfromLotteryType = lotteryTypeTransformation;
exports.transformUser = userTransformation;
exports.transformLotteryBalls = lotterBallsTransformation;
exports.transformSummary = summaryTransformation;