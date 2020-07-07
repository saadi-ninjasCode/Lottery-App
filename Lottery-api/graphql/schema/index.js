const { gql } = require('apollo-server-express')

module.exports = gql`
type LotteryType{
    _id: ID!
    name: String!
    next_draw: String
    icon_name: String
    coldBall : [BallsCount!]
    hotBall  : [BallsCount!]
    user_list: [User!]
}
type BallsCount{
    ball : Int!
    times: Int!
}

type User{
    _id: ID!
    name: String!
    email: String!
    password: String
}
type Admin {
    _id: ID!
    name: String!
    email: String!
    password: String
    role: String
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
    name: String
    token: String!
    tokenExpiration: Int!
}

input LotteryInput {
    _id: String
    name: String!
    next_draw: String
    icon_name: String
}
input CountInput{
    ball : Int!
    times: Int!
}
input BallsCountInput {
    lottery : ID!
    coldBall : [CountInput!]
    hotBall  : [CountInput!]
}


input UserInput{
    name: String!
    email: String!
    password: String!
}

input LotteryBallsInput{
    _id: String
    lottery : ID!
    date: String!
    balls : [Int!]
    SpecialBalls : [Int!]
    pending : Boolean!
}

type Query {
    lottery : [LotteryType!]!
    user : [User!]!
    lotteryBalls : [LotteryBalls!]
    adminUsers: [Admin!]
}

type Mutation{
    adminLogin(email: String!, password: String!): AuthData!
    adminChangePassword(oldPassword: String!, newPassword: String!): Boolean!
    createLottery( lotteryInput : LotteryInput ) : LotteryType!
    createAdminUser( userInput : UserInput ) : Admin!
    createLotteryBalls ( lotteryInput : LotteryBallsInput ) : LotteryBalls!
    editLottery(lotteryInput: LotteryInput!) : LotteryType!
    editFavouriteBalls ( ballCountInput : BallsCountInput) : LotteryType!
    deleteLottery(id: String!) : LotteryType!
    deleteAdminUser(id: String!): Admin!
}`