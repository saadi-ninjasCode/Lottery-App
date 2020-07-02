const LotteryType = require('../../models/lotteryType');
const User = require('../../models/user')
const { dateToString, dateToLocal } = require('../../helpers/date')


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
        next_draw: dateToString(lottery._doc.next_draw),
        // user_list: lottery.user_list.length
        user_list: userById(lottery.user_list)

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
            console.log(userids)
            throw 'Here'
        }
    }
    catch (e) {
        console.log(e); ``
        throw e;
    }
}

const usageBallTransformation = ball => {
    return {
        ...ball._doc,
        _id: ball.id,
        lottery: lotteryById(ball._doc.lottery)
    }
}

const userTransformation = user => {
    return {
        ...user._doc,
        _id: user.id,
    }
}

const lotterBallsTransformation = ball => {
    return {
        ...ball._doc,
        _id: ball.id,
        lottery: lotteryById(ball._doc.lottery),
        date: dateToLocal(ball._doc.date)
    }
}



exports.transfromLotteryType = lotteryTypeTransformation;
exports.transformUsageBalls = usageBallTransformation;
exports.transformUser = userTransformation;
exports.transformLotteryBalls = lotterBallsTransformation;