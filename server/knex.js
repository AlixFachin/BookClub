require('dotenv').config();
const knex = require('knex');
const dbConfig = require('../knexconfig.js');
const {Model} = require('objection');

const db = knex(dbConfig[process.env.NODE_ENV || 'development']);

Model.knex(db);

class Book extends Model {
  static get tableName() {
    return 'books';
  }
  static get idColumn() {
    return 'id';
  }
}
class User extends Model {
  static get tableName() {
    return 'users';
  }
  static get idColumn() {
    return 'id';
  }
}

module.exports = {
  knex: db,

  getAllBooks: () => {
    return Book.query();
  },
  getOneBook: (bookId) =>{
    return Book.query().findById(bookId);
  },
  getOneUser: (userId) =>{
    return User.query().findById(userId);
  },
  addOneBook: (bookId, data) => {
    return Book.query().
  }

};
