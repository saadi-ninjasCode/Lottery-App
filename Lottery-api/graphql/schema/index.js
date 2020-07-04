const { gql } = require('apollo-server-express')

module.exports = gql`
type LotteryType{
    _id: ID!
    name: String!
    next_draw: String
    icon_name: String
    user_list:[User!]
}

type User{
    _id: ID!
    name: String!
    email: String!
    password: String
}

type UsageBalls {
    _id: ID!
    lottery : LotteryType!
    coldBall : [Int!]!
    hotBall : [Int!]!
}
type LotteryBalls{
    _id: ID!
    lottery : LotteryType!
    date: String!
    balls : [Int!]
    specialBalls : [Int!]
    pending : Boolean!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
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

input LotteryBallsInput{
    lottery : ID!
    date: String!
    balls : [Int!]
    SpecialBalls : [Int!]
    pending : Boolean!
}

type Query {
    lottery : [LotteryType!]!
    user : [User!]!
    usageBalls: [UsageBalls!]!
    lotteryBalls : [LotteryBalls!]
}

type Mutation{
    adminLogin(email: String!, password: String!): AuthData!
    createLottery( lotteryInput : LotteryInput ) : LotteryType!
    createUser( userInput : UserInput ) : User!
    createUsageBalls ( usageInput : UsageBallsInput) : UsageBalls!
    createLotteryBalls ( lotteryInput : LotteryBallsInput ) : LotteryBalls!

}`