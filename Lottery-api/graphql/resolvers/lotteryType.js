const LotteryType = require('../../models/lotteryType');
const { transfromLotteryType, transformSummary } = require('./transformation');
const LotteryBalls = require('../../models/lotteryBalls');
const { pubsub, DASHBOARD_INFO, publishToDashboardInfo } = require('../../helpers/subscription');

module.exports = {
    Query: {
        lottery: async () => {
            console.log("Lottery Type")
            try {
                const lotteries = await LotteryType.find().sort({ name: 1 });
                return lotteries.map(lottery => {
                    return transfromLotteryType(lottery);
                })
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        dasboardInfo: async (_, args, context) => {
            console.log('Dashboard Info')
            // if (!context.isAuth) {
            //     throw new Error("Unauthenticated!")
            // }
            const lotteries = await LotteryType.find().sort({ name: 1 });
            return lotteries.map(lott => {
                return transformSummary(lott)
            })
        }
    },
    Mutation: {
        createLottery: async (_, args, context) => {
            console.log("Create Lottery")
            if (!context.req.isAuth) {
                throw new Error("Unauthenticated!")
            }
            const existingName = await LotteryType.findOne({ name: args.lotteryInput.name });
            if (existingName) {
                throw new Error('Lottery Name is already exist.');
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
            if (!context.req.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const checkName = await LotteryType.findOne({ name: args.lotteryInput.name })
                if ((checkName) && checkName._id != args.lotteryInput._id) {
                    throw new Error('Lottery Name already exists')
                }
                const getLottery = await LotteryType.findById(args.lotteryInput._id)

                getLottery.name = args.lotteryInput.name
                getLottery.next_draw = args.lotteryInput.next_draw
                getLottery.icon_name = args.lotteryInput.icon_name
                const result = await getLottery.save()
                const transformData = await transfromLotteryType(result);
                //Dashboard Subscription
                const dashboardData = await transformSummary(result)
                // console.log('data: ', dashboardData)
                publishToDashboardInfo(dashboardData, 'edit')
                return transformData
            } catch (err) {
                console.log(err)
                throw err;
            }
        },
        editFavouriteBalls: async (_, args, context) => {
            console.log('Edit Favourite Ball')
            if (!context.req.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                let checkLottery = await LotteryType.findById(args.ballsCountInput.lottery)
                if (!checkLottery) {
                    throw new Error("Lottery doesn't exist")
                }
                if (args.ballsCountInput.coldBall) {
                    if (args.ballsCountInput.coldBall.length > 3) {
                        throw new Error("Can't perform this action.")
                    }
                    if (args.ballsCountInput.coldBall.length <= 3)
                        checkLottery.coldBall = args.ballsCountInput.coldBall.sort(function (a, b) { return (b.times - a.times) })
                }
                if (args.ballsCountInput.hotBall) {
                    if (args.ballsCountInput.hotBall.length > 3) {
                        throw new Error("Can't perform this action.")
                    }
                    if (args.ballsCountInput.hotBall.length <= 3)
                        checkLottery.hotBall = args.ballsCountInput.hotBall.sort(function (a, b) { return (b.times - a.times) })
                }
                const result = await checkLottery.save({ validateBeforeSave: false })

                return transfromLotteryType(result)
            } catch (err) {
                console.log(err)
                throw err;
            }
        },
        deleteLottery: async (_, args, context) => {
            console.log('Delete Lottery')
            // IMplement Delete to end level

            if (!context.req.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                const checkLottery = await LotteryType.findById(args.id)
                if (!checkLottery) {
                    throw new Error("Lottery doesn't Exist")
                }
                const result = await LotteryBalls.deleteMany({ lottery: args.id })
                if (result.ok !== 1) {
                    throw new Error("Deletion Failed")
                }
                else {
                    const lotteryResult = await LotteryType.deleteOne({ _id: args.id })
                    if (lotteryResult.ok !== 1)
                        throw new Error("Deletion Failed!")
                    else {
                        const transformData = transfromLotteryType(checkLottery);
                        // console.log('data: ', transformData)
                        // publishToDashboardInfo(transformData, 'edit')
                        return transformData
                    }
                }
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        deleteColdBalls: async (_, args, context) => {
            console.log('Delete Favourite Ball ')
            if (!context.req.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                let checkLottery = await LotteryType.findById(args.id)
                if (!checkLottery) {
                    throw new Error("Lottery doesn't exist")
                }
                checkLottery.coldBall = []
                const result = await checkLottery.save()
                const transformData = await transfromLotteryType(result);
                return transformData
            } catch (err) {
                console.log(err)
                throw err;
            }
        },
        deleteHotBalls: async (_, args, context) => {
            console.log('Delete Favourite Ball ')
            if (!context.req.isAuth) {
                throw new Error("Unauthenticated!")
            }
            try {
                let checkLottery = await LotteryType.findById(args.id)
                if (!checkLottery) {
                    throw new Error("Lottery doesn't exist")
                }
                checkLottery.hotBall = []
                const result = await checkLottery.save()
                return transfromLotteryType(result)
            } catch (err) {
                console.log(err)
                throw err;
            }
        }
    },
    Subscription: {
        subscribeDashBoard: {
            subscribe: () => pubsub.asyncIterator(DASHBOARD_INFO)
        }
    }
};