const LotteryBalls = require('../../models/lotteryBalls');
const { transformLotteryBalls } = require('./transformation')

module.exports = {
    lotteryBalls: async () => {
        console.log('Lottery Balls');
        try {
            const balls = await LotteryBalls.find();
            return balls.map(ball => {
                return transformLotteryBalls(ball)
            })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    createLotteryBalls: async (args, req) => {
        try {
            const balls = new LotteryBalls({
                lottery: args.lotteryInput.lottery,
                date: args.lotteryInput.date,
                balls: args.lotteryInput.balls,
                specialBalls: args.lotteryInput.specialBalls,
                pending: args.lotteryInput.pending,
            })
            const result = await balls.save();
            return transformLotteryBalls(result);
        }
        catch (err) {
            console.log(err);
            throw (err);
        }
    }
}