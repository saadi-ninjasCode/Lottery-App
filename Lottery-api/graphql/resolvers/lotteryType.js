const LotteryType = require('../../models/lotteryType');
const { transfromLotteryType } = require('./transformation')

module.exports = {
    Query: {
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
    },
    Mutation: {
        createLottery: async (args, { req, res }) => {
            console.log("Create Lottery")
            console.log('auth: ', req.isAuth)
            if (!req.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const lottery = new LotteryType({
                    name: args.lotteryInput.name,
                    next_draw: args.lotteryInput.next_draw,
                    icon_name: args.lotteryInput.icon_name
                });
                //hard code
                lottery.user_list.push("5ebd1eb85bbb953a30f5b921")
                const result = await lottery.save();
                return transfromLotteryType(result);
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
    }
};