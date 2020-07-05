const LotteryType = require('../../models/lotteryType');
const { transfromLotteryType } = require('./transformation');
const lotteryType = require('../../models/lotteryType');

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
        createLottery: async (_, args, context) => {
            console.log("Create Lottery")
            console.log(args)
            if (!context.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const lottery = new LotteryType({
                    name: args.lotteryInput.name,
                    next_draw: args.lotteryInput.next_draw,
                    icon_name: args.lotteryInput.icon_name
                });
                //hard code
                // lottery.user_list.push("5ebd1eb85bbb953a30f5b921")
                const result = await lottery.save();
                return transfromLotteryType(result);
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        editLottery: async (_, args, context) => {
            console.log('Edit Lottery')
            if (!context.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const checkName = await LotteryType.findOne({ name: args.lotteryInput.name })
                if ((checkName) && checkName._id != args.lotteryInput._id) {
                    throw new Error('Lottery Name already exists')
                }
                const getLottery = await lotteryType.findById(args.lotteryInput._id)

                getLottery.name = args.lotteryInput.name
                getLottery.next_draw = args.lotteryInput.next_draw
                getLottery.icon_name = args.lotteryInput.icon_name
                const result = await getLottery.save()
                return transfromLotteryType(result)
            } catch (err) {
                console.log(err)
                throw err;
            }
        },
        deleteLottery: async (_, args, context) => {
            console.log('Delete Lottery')
            console.log(args)
            if (!context.isAuth) {
                throw new Error("Unauthenticated!")
            }
        },
    }
};