require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'client_order_system',
  port: 3306,
  connectionLimit: 10,
  bigintAsNumber: true
});

module.exports = pool;