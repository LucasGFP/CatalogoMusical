const Artista = require('./Artista');
const Disco = require('./Disco');

// Associações no arquivo index.js
Artista.hasMany(Disco, {
  as: 'discosArtista',
  foreignKey: 'artistaId',
});

Disco.belongsTo(Artista, {
  as: 'artistaDisco',
  foreignKey: 'artistaId',
});

module.exports = { Artista, Disco };
