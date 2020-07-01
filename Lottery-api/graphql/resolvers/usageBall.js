const usageBall = require("../../models/usageBall")
const LotteryType = require('../../models/lotteryType');
const { transformUsageBalls } = require('./transformation')

module.exports = {
    Query: {
        usageBalls: async () => {
            console.log("Cold/Hot Balls")
            try {
                const balls = await usageBall.find()
                return balls.map(ball => {
                    return transformUsageBalls(ball);
                })
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    },
    Mutation: {
        createUsageBalls: async (args) => {
            try {
                const balls = new usageBall({
                    lottery: args.usageInput.lottery,
                    coldBall: args.usageInput.coldBall,
                    hotBall: args.usageInput.hotBall
                });
                const result = await balls.save();
                return transformUsageBalls(result);
            } catch (err) {
                console.log(err)
                throw err;
            }
        },
    }
}