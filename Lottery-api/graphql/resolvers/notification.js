const LotteryType = require("../../models/lotteryType")
const User = require('../../models/user');
const { transfromLotteryType } = require("./transformation");
const { Expo } = require('expo-server-sdk')
const { sendNotificationMobile } = require('../../helpers/notificationsUtill')

module.exports = {
    Mutation: {
        pushToken: async (_, args, context) => {
            console.log("Notification")
            if (!context.req.isAuth) {
                throw new Error("Unauthenticated!")
            }

        },
        sendNotification: async (_, args, context) => {
            console.log('sendNotificationUser')
            const messages = []
            // console.log('args: ', args.lotteryID)
            try {
                const lottery = await LotteryType.findById(args.lotteryID)
                const users = await User.find({ _id: { $in: lottery.user_list } })
                users.forEach(async (user, i) => {
                    if (user.notificationToken) {
                        if (Expo.isExpoPushToken(user.notificationToken)) {
                            messages.push({
                                to: user.notificationToken,
                                sound: 'default',
                                body: 'New result announced!',
                                title: 'Draw Name',
                                channelId: 'default',
                                data: {
                                    lotteryId: lottery._id,
                                    drawId: 'abc'
                                }
                            })
                        }
                    }
                })
                // console.log('message: ', messages)
                await sendNotificationMobile(messages)
                return 'Success'
            } catch (err) {
                console.log(err)
            }
        }
    }
}