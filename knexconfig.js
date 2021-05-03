require('dotenv').config();

// knexconfig.js -> exports the database configuration ( via ENV variables)
// this file can be used both by the knex CLI and by knex.js runtime library

const basicDbConfig = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seed',
  },
};

const dbConfig = {
  development: basicDbConfig,
  staging: basicDbConfig,
  production: basicDbConfig,
};

module.exports = dbConfig;
