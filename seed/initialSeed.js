const data = require('./initialData.json');

exports.seed = function(knex) {
  // First, seeding the book entries
  let userIdArray;
  let bookIdArray;
  return knex('users_books').del().then(() => {
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
  }).then( () => {
    return knex('users').select('*').then((data) => {
      userIdArray = data.map((userObject) => userObject.id);
      return knex('books').select('*');
    }).then((data)=> {
      bookIdArray = data.map((bookObject) => bookObject.id);
      return knex('users_books').insert([
        {userId: userIdArray[0], bookId: bookIdArray[0], status: 'Available'},
        {userId: userIdArray[0], bookId: bookIdArray[1], status: 'Available'},
        {userId: userIdArray[1], bookId: bookIdArray[0], status: 'Available'},
        {userId: userIdArray[2], bookId: bookIdArray[2], status: 'Available'},
      ]);
    });
  }).catch((error) => {
    console.error(`Error in the seeding function!!! ${error}`);
  });
};
