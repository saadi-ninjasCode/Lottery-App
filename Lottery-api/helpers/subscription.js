const { PubSub } = require("apollo-server-express");

const pubsub = new PubSub()
const LOTTERY_CREATE = 'LOTTERY_CREATE'

const publishToLotteryBalls = (balls) => {
    pubsub.publish(LOTTERY_CREATE, { balls })
}


module.exports = {
    pubsub,
    LOTTERY_CREATE,
    publishToLotteryBalls
}