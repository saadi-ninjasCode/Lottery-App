const LotteryType = require('../../models/lotteryType');
const { transfromLotteryType } = require('./transformation')

module.exports = {
    lottery: async () => {
        console.log("Lottery Type")
        try {
            const lotteries = await LotteryType.find();
            return lotteries.map(lottery => {
                return transfromLotteryType(lottery);
            })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    createLottery: async (args) => {
        console.log("Create Lottery")
        try {
            const lottery = new LotteryType({
                name: args.lotteryInput.name,
                next_draw: args.lotteryInput.next_draw,
            });
            const result = await lottery.save();
            return transfromLotteryType(result);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
};