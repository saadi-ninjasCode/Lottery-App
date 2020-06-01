const lotteryResolver = require('./lotteryType')
const userResolver = require('./user')
const usageBallResolver = require('./usageBall')


const rootResolver = {
    ...lotteryResolver,
    ...userResolver,
    ...usageBallResolver,
};

module.exports = rootResolver;