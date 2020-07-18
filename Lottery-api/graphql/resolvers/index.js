const lotteryResolver = require('./lotteryType');
const userResolver = require('./user');
const lotteryBalls = require('./lotteryBalls');


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
    }
};

module.exports = rootResolver;