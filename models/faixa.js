

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Faixa = sequelize.define('Faixa', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracao: {
    type: DataTypes.STRING, // Ex: "3:45"
    allowNull: true,
  },
});

module.exports = Faixa;
