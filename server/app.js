require('dotenv').config();
const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const path = require('path');
const axios = require('axios');

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
    allUsers: [User] # temporary for debugging
    singleBook(bookId: Int!): Book
    singleUser(userId: Int!): User
    userByAuthId(authId: String!): [User]
    bookInventory(userId: Int!): [Book]
    bookOwners(bookId: Int!): [User]
  }

  type Mutation {
    createBook(bookData: InputBook): Book
    deleteBook(bookId: Int!): Int
    createUser(userData: InputUser): User
    deleteUser(userId: Int!): Int
    addToInventory(userId: Int!, bookId: Int!, status: String!): User_Book
  }

  type Book {
    id: Int
    author: String
    title: String
    language: String
    genre: String
  }

  input InputBook {
    author: String!
    title: String!
    language: String!
    genre: String
  }

  type User {
    id:Int
    nickName: String!
    fullName: String!
    authId: String!
    area: String
  }

  input InputUser {
    nickName: String!
    fullName: String!
    authId: String!
    email: String
    area: String 
  }

  type User_Book {
    bookId: Int!
    userId: Int!
    status: String!
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
    userByAuthId: (_, args) => {
      return dbUtils.getUserByAuthId(args.authId);
    },
    allUsers: (_, args) => {
      return dbUtils.getAllUsers();
    },
    bookInventory: (_, args) => {
      return dbUtils.getBooksOwnedByUser(args.userId);
    },
    bookOwners: (_, args) => {
      return dbUtils.getOwnersOfBook(args.bookId);
    },
  },
  Mutation: {
    createBook: async (_, args) => {
      return dbUtils.createOneBook(args.bookData);
    },
    deleteBook: async (_, args) => {
      return dbUtils.deleteOneBook(args.bookId);
    },
    createUser: async (_, args) => {
      // Creation of a user -> we need to create the Chat user as well
      const chatUserData = {
        'username': args.userData.nickName,
        'secret': args.userData.authId,
      };
      // console.log(`Before sending the HTTP POST to the Chat API`);
      // console.log(`userData: ${JSON.stringify(chatUserData)}`);
      // console.log(`env: ${process.env.CHAT_PRIVATE_KEY}`);
      return axios({
        method: 'POST',
        url: 'https://api.chatengine.io/users/',
        headers: {'PRIVATE-KEY': process.env.CHAT_PRIVATE_KEY},
        data: chatUserData,
      }).then((response) => {
        console.log(JSON.stringify(response.data));
        return response;
      }).catch((error) => {
        console.log(`WOOPS~~~~! Error in the chat user creation`);
        console.log(error);
      }).then(() => {
        // DATABASE USER CREATION
        return dbUtils.createOneUser(args.userData);
      });
    },
    deleteUser: async (_, args) => {
      return dbUtils.deleteOneUser(args.userId);
    },
    addToInventory: async (_, args) => {
      return dbUtils.addToInventory(args.userId, args.bookId, args.status);
    },

  },
};

const server = new ApolloServer( {typeDefs, resolvers});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(cors());
server.applyMiddleware( {app} );

module.exports = app;
