const LotteryBalls = require('../../models/lotteryBalls');
const LotteryType = require('../../models/lotteryType')
const { transformLotteryBalls } = require('./transformation')

module.exports = {
    Query: {
        lotteryBalls: async (_, args) => {
            console.log('Lottery Balls');
            try {
                const balls = await LotteryBalls.find()
                    .sort({ date: -1 })
                    .skip((args.page || 0) * args.rows)
                    .limit(args.rows);
                return balls.map(ball => {
                    return transformLotteryBalls(ball)
                })
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        drawCount: async () => {
            console.log('Total Draws');
            try {
                const totalDraws = await LotteryBalls.estimatedDocumentCount();
                return totalDraws
            } catch (err) {
                console.log(err)
                throw err;
            }
        }
    },
    Mutation: {
        createLotteryBalls: async (_, args, context) => {
            console.log('Create New Draw')
            if (!context.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const checkLottery = await LotteryType.findById(args.lotteryInput.lottery)
                if (!checkLottery) {
                    throw new Error("Lottery doesn't exist")
                }
                const balls = new LotteryBalls({
                    lottery: args.lotteryInput.lottery,
                    date: args.lotteryInput.date,
                    balls: args.lotteryInput.pending ? [] : args.lotteryInput.balls,
                    specialBalls: args.lotteryInput.pending ? [] : args.lotteryInput.specialBalls,
                    pending: args.lotteryInput.pending,
                })
                const result = await balls.save();
                return transformLotteryBalls(result);
            }
            catch (err) {
                console.log(err);
                throw (err);
            }
        },
        editLotteryBalls: async (_, args, context) => {
            console.log("Draw Edit")
            if (!context.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const checkLottery = await LotteryType.findById(args.lotteryInput.lottery)
                if (!checkLottery) {
                    throw new Error("Lottery doesn't exist")
                }
                const getDraw = await LotteryBalls.findOne({ _id: args.lotteryInput._id, lottery: args.lotteryInput.lottery })
                getDraw.date = args.lotteryInput.date
                getDraw.balls = args.lotteryInput.pending ? [] : args.lotteryInput.balls
                getDraw.specialBalls = args.lotteryInput.pending ? [] : args.lotteryInput.specialBalls
                getDraw.pending = args.lotteryInput.pending
                const result = await getDraw.save();
                return transformLotteryBalls(result);
            }
            catch (err) {
                console.log(err);
                throw (err);
            }
        },
        deleteDraw: async (_, args, context) => {
            console.log("Delete Draw")
            if (!context.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const getDraw = await LotteryBalls.findById(args.id)
                const result = await LotteryBalls.deleteOne({ _id: args.id })
                if (result.ok !== 1) {
                    throw new Error("Deletion failed")
                }
                else {
                    return transformLotteryBalls(getDraw);
                }
            }
            catch (err) {
                console.log(err);
                throw (err);
            }
        }
    }
}