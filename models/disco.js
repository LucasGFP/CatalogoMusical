


const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Faixa = require('./faixa'); // Importa o modelo Faixa para associação

const Disco = sequelize.define('Disco', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anoLancamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  capa: {
    type: DataTypes.STRING, // Caminho ou URL para a imagem
    allowNull: true,
  },
});

// Associação com Faixas
Disco.hasMany(Faixa, { foreignKey: 'discoId', as: 'faixas' });
Faixa.belongsTo(Disco, { foreignKey: 'discoId' });

module.exports = Disco;
