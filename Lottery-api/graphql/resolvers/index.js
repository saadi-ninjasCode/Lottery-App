const lotteryResolver = require('./lotteryType');
const userResolver = require('./user');
const usageBallResolver = require('./usageBall');
const lotteryBalls = require('./lotteryBalls');


const rootResolver = {
    Query: {
        ...lotteryResolver.Query,
        ...userResolver.Query,
        ...usageBallResolver.Query,
        ...lotteryBalls.Query,
    },
    Mutation: {
        ...lotteryResolver.Mutation,
        ...userResolver.Mutation,
        ...usageBallResolver.Mutation,
        ...lotteryBalls.Mutation,
    }
};

module.exports = rootResolver;