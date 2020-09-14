
const { Expo } = require('expo-server-sdk');
const User = require('../models/user');

const NEW_DRAW = 'New result announced!'
const APP_NAME = 'Results 49 - '

// Create a new Expo SDK client
let expo = new Expo();

const sendNotificationMobile = async messages => {
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
            console.log('tickets');
        } catch (err) {
            console.log("chunk: ", err)
        }
    }
    let receiptIds = [];
    for (let ticket of tickets) {
        if (ticket.id) {
            receiptIds.push(ticket.id);
        }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    async () => {
        for (let chunk of receiptIdChunks) {
            try {
                let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                console.log(receipts);
                for (let receiptId in receipts) {
                    let { status, message, details } = receipts[receiptId];
                    if (status === 'ok') {
                        continue;
                    } else if (status === 'error') {
                        console.error(
                            `There was an error sending a notification: ${message}`
                        );
                        if (details && details.error) {
                            // The error codes are listed in the Expo documentation:
                            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                            // You must handle the errors appropriately.
                            console.error(`The error code is ${details.error}`);
                        }
                    }
                }

            } catch (err) {
                console.log(err)
            }
        }
    }
}

const sendNotificationUser = async data => {
    const messages = []
    try {
        const users = await User.find({ _id: { $in: data.userList } })
        users.forEach(async (user, i) => {
            if (user.notificationToken) {
                if (Expo.isExpoPushToken(user.notificationToken)) {
                    messages.push({
                        to: user.notificationToken,
                        sound: 'default',
                        body: data.message,
                        title: APP_NAME + data.title,
                        channelId: 'default',
                        data: {
                            lotteryId: data.lotteryId
                        }
                    })
                }
            }
        })
        sendNotificationMobile(messages)
    } catch (err) {
        console.log(err)
    }
}

exports.sendNotificationMobile = sendNotificationMobile
exports.sendNotificationUser = sendNotificationUser
exports.NEW_DRAW = NEW_DRAW