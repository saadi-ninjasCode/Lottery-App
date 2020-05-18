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

input LotteryInput {
    name: String!
    next_draw: String
}

input UserInput{
    name: String!
    email: String!
    password: String!
}

type RootQuery {
    lottery(id : String) : [LotteryType!]!
    user(id : String) : [User!]!
}

type RootMutation{
    createLottery( lotteryInput : LotteryInput ) : LotteryType!
    createUser( userInput : UserInput ) : User!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);