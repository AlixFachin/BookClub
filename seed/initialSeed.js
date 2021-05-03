const data = require('./initialData.json');

exports.seed = function(knex) {
  // First, seeding the book entries
  return Promise.all([
    knex('books').del()
        .then(function() {
        // Inserts seed entries
          return knex('books').insert(data.books);
        }),
    knex('users').del()
        .then(() => {
          return knex('users').insert(data.users);
        }),
  ]);
};
