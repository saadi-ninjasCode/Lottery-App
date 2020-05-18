const lotteryResolver = require('./lotteryType')
const userResolver = require('./user')


const rootResolver = {
    ...lotteryResolver,
    ...userResolver,
  };

module.exports = rootResolver;