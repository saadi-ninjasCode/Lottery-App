const lotteryResolver = require('./lotteryType');
const userResolver = require('./user');
const lotteryBalls = require('./lotteryBalls');
const notification = require('./notification');


const rootResolver = {
    Query: {
        ...lotteryResolver.Query,
        ...userResolver.Query,
        ...lotteryBalls.Query,
    },
    Mutation: {
        ...lotteryResolver.Mutation,
        ...userResolver.Mutation,
        ...lotteryBalls.Mutation,
        ...notification.Mutation
    },
    Subscription: {
        ...lotteryBalls.Subscription,
        ...lotteryResolver.Subscription
    },
};

module.exports = rootResolver;