// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('catalogomusical', 'postgres', 'lucas', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
