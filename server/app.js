require('dotenv').config();
const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');

const cors = require('cors');
const morgan = require('morgan');

const app = express();

const dbUtils = require('./knex.js');

// Setup morgan logger
app.use(
    morgan(
        // eslint-disable-next-line max-len
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms',
    ),
);

// SCHEMA DEFINITION

const typeDefs = gql`
  type Query {
    allBooks: [Book]
    singleBook(bookId: Int!): Book
    singleUser(userId: Int!): User
  }

  type Book {
    id: Int
    author: String
    title: String
    language: String
    genre: String
  }

  type User {
    id:Int
    nickName: String
    area: String 
  }
`;

const resolvers = {
  Query: {
    allBooks: (_, args) => {
      return dbUtils.getAllBooks();
    },
    singleBook: (_, args) => {
      return dbUtils.getOneBook(args.bookId);
    },
    singleUser: (_, args) => {
      return dbUtils.getOneUser(args.userId);
    },
  },
};

const server = new ApolloServer( {typeDefs, resolvers});

app.use(cors());
server.applyMiddleware( {app} );

app.get('/testEndpoint', (req, res) => {
  res.send({express: 'DOES IT SOUND LIKE A SUCCESS???'});
});

module.exports = app;
