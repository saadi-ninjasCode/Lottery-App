const { PubSub } = require("apollo-server-express");

const pubsub = new PubSub()
const DRAW_CREATE = 'DRAW_EDIT'
const DASHBOARD_INFO = 'DASHBAORD_INFO'

const publishToLotteryBalls = (balls, origin) => {
    const subscribeDraw = {
        balls,
        origin
    }
    // console.log('bb:', balls)
    pubsub.publish(DRAW_CREATE, { subscribeDraw })
}

const publishToDashboardInfo = (balls, origin) => {
    const subscribeDashBoard = {
        balls,
        origin
    }
    // console.log('bb:', balls)
    pubsub.publish(DASHBOARD_INFO, { subscribeDashBoard })
}

module.exports = {
    pubsub,
    DRAW_CREATE,
    DASHBOARD_INFO,
    publishToLotteryBalls,
    publishToDashboardInfo
}