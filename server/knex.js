require('dotenv').config();
const knex = require('knex');
const dbConfig = require('../knexconfig.js');
const {Model} = require('objection');

const db = knex(dbConfig[process.env.NODE_ENV || 'development']);

Model.knex(db);

class Book extends Model {
  static get tableName() {
    return 'books';
  };
  static get idColumn() {
    return 'id';
  };

  static get relationMappings() {
    return {
      owners: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'books.id',
          through: {
            // users_books is the join table
            from: 'users_books.bookId',
            to: 'users_books.userId',
          },
          to: 'users.id',
        },
      },
    };
  };
}
class User extends Model {
  static get tableName() {
    return 'users';
  }
  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      inventory: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'users.id',
          through: {
            // users_books is the join table
            from: 'users_books.userId',
            to: 'users_books.bookId',
          },
          to: 'books.id',
        },
      },
    };
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

};
