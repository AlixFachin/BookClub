
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('books',
        function(t) {
          t.increments('id').unsigned().primary();
          t.string('title').notNull();
          t.string('genre').notNull();
          t.string('author').notNull();
          t.string('language', 10);
        },
    ),
    knex.schema.createTable('users',
        function(t) {
          t.increments('id').unsigned().primary();
          t.string('fullName').notNull();
          t.string('nickName').notNull();
          t.string('area').notNull();
        }),
    knex.schema.createTable('users_books',
        function(t) {
          t.increments('id').unsigned().primary();
          t.integer('userId').unsigned().references('id').inTable('users');
          t.integer('bookId').unsigned().references('id').inTable('books');
          t.enu('status', ['Available', 'Not Available']);
        }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('users_books'),
    knex.schema.dropTableIfExists('books'),
    knex.schema.dropTableIfExists('users'),
  ]);
};
