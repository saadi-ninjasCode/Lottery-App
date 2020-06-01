const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type LotteryType{
    _id: ID!
    name: String!
    next_draw: String
}

type User{
    _id: ID!
    name: String!
    email: String!
    password: String
    notifications: [LotteryType!]
}

type UsageBalls {
    _id: ID!
    lottery : LotteryType!
    coldBall : [Int!]!
    hotBall : [Int!]!
}

input LotteryInput {
    name: String!
    next_draw: String
}

input UserInput{
    name: String!
    email: String!
    password: String!
}
input UsageBallsInput {
    lottery : ID!
    coldBall : [Int!]!
    hotBall : [Int!]!
}

type RootQuery {
    lottery : [LotteryType!]!
    user : [User!]!
    usageBalls: [UsageBalls!]!
}

type RootMutation{
    createLottery( lotteryInput : LotteryInput ) : LotteryType!
    createUser( userInput : UserInput ) : User!
    createUsageBalls ( usageInput : UsageBallsInput) : UsageBalls!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);