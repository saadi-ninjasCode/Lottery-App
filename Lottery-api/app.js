const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { ApolloServer, gql } = require('apollo-server-express')
const isAuth = require('./middleware/is-auth')
//Configure the dotenv for loading the environment variable from .env file to process.env
dotenv.config()

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.use(isAuth);

const server = new ApolloServer({
    typeDefs: graphQlSchema,
    resolvers: graphQlResolvers,
    // context: ({ req, res }) => {
    //     return { req, res }
    // }
});


server.applyMiddleware({ app });

app.get('/', function (req, res) {
    res.send("Ready to Display")
})

mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`🚀  server started at http://localhost:${process.env.PORT}${server.graphqlPath}`)
        })
    })
    .catch(err => console.log("DB Connection Error : \n ", err))