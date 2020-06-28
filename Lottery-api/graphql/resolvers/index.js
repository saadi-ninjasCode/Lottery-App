const lotteryResolver = require('./lotteryType');
const userResolver = require('./user');
const usageBallResolver = require('./usageBall');
const lotteryBalls = require('./lotteryBalls');


const rootResolver = {
    ...lotteryResolver,
    ...userResolver,
    ...usageBallResolver,
    ...lotteryBalls,
};

module.exports = rootResolver;