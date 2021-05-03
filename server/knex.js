require("dotenv").config();
const knex = require("knex");
const dbConfig = require('./knexconfig.js');

const db = knex(dbConfig);

module.exports = db;