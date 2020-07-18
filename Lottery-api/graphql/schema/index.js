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
    ball : String!
    times: String!
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
    balls : [String!]
    specialBalls : [String!]
    pending : Boolean!
}

type AuthData {
    userId: ID!
    name: String
    token: String!
    tokenExpiration: Int!
}

type dashboardLottery {
    lottery: LotteryType
    draw: LotteryBalls
}

input LotteryInput {
    _id: String
    name: String!
    next_draw: String
    icon_name: String
}
input CountInput{
    ball : String!
    times: String!
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
    balls : [String!]
    specialBalls : [String!]
    pending : Boolean!
}

type Query {
    lottery : [LotteryType!]!
    dasboardInfo: [dashboardLottery]
    user : [User!]!
    lotteryBalls(page: Int, rows: Int) : [LotteryBalls!]
    drawCount: Int
    adminUsers: [Admin!]
}

type Mutation{
    adminLogin(email: String!, password: String!): AuthData!
    adminChangePassword(oldPassword: String!, newPassword: String!): Boolean!
    createLottery( lotteryInput : LotteryInput ) : LotteryType!
    createAdminUser( userInput : UserInput ) : Admin!
    createLotteryBalls ( lotteryInput : LotteryBallsInput ) : LotteryBalls!
    editLottery(lotteryInput: LotteryInput!) : LotteryType!
    editLotteryBalls ( lotteryInput : LotteryBallsInput ) : LotteryBalls!
    editFavouriteBalls( ballsCountInput : BallsCountInput) : LotteryType!
    deleteLottery(id: String!) : LotteryType!
    deleteAdminUser(id: String!): Admin!
    deleteColdBalls(id: String!): LotteryType!
    deleteHotBalls(id: String!): LotteryType!
    deleteDraw(id: String!): LotteryBalls!
}`