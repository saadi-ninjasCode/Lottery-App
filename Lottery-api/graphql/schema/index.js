const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type LotteryType{
    id:ID!
    name:String!
    next_draw: String
}

input LotteryInput {
    name:String!
    next_draw: String
}

type RootQuery {
    lottery(id:Int): [LotteryType!]!
}

type RootMutation{
    createLottery(lotteryInput:[LotteryInput]):[LotteryType!]
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);