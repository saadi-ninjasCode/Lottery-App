const LotteryType = require('../../models/lotteryType');

module.exports = {
    lottery: async () => {
        console.log("Lottery Type")
        try {
            const lotteries = await LotteryType.find();
            return lotteries.map(lottery => {
                return { ...lottery._doc, _id: lottery.id, next_draw: new Date(lottery._doc.next_draw).toISOString() }
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
            return ({ ...result._doc, _id: result.id })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
};