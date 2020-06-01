const LotteryType = require('../../models/lotteryType');
const usageBall = require("../../models/usageBall");


const lotteryById = async (lotteryids) => {
    try {
        const lottery = await LotteryType.findById(lotteryids);
        return lotteryTypeTransformation(lottery);
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
        next_draw: new Date(lottery._doc.next_draw).toISOString()
    };
};

const usageBallTransformation = ball => {
    return {
        ...ball._doc,
        _id: ball.id,
        lottery: lotteryById(ball._doc.lottery)
    }
}



exports.transfromLotteryType = lotteryTypeTransformation;
exports.transformUsageBalls = usageBallTransformation;