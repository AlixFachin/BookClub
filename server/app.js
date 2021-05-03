require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Setup morgan logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
)

// SCHEMA DEFINITION

const typeDefs = gql`
  type Query {
    allBooks: [Book]
  }

  type Book {
    author: String
    title: String
  }
`;

const resolvers = {
  Query: {
    allBooks: (_, args) => {
      return undefined;
    }
  },
};

const server = new ApolloServer( { typeDefs, resolvers});

app.use(cors());
server.applyMiddleware( {app} );

app.get('/testEndpoint', (req, res) => {
  res.send({express: 'DOES IT SOUND LIKE A SUCCESS???'})
})

module.exports = app;