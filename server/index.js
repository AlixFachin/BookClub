require('dotenv').config();

const app = require('./app');
// const db=require("./knex");

(async () => {
  try {
    // console.log("Running migrations");
    // await db.migrate.latest();
    // await db.seed.run(); //inelegant way to do this
    console.log('Starting express');
    app.listen({port: process.env.PORT || 3000}, () =>
      console.log(
          `Express server listening on port ${process.env.PORT || 3000}`,
      ),
    );
  } catch (err) {
    console.error('Error starting app!', err);
    process.exit(-1);
  }
})();
