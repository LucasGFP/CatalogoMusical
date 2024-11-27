module.exports = (sequelize, DataTypes) => {
  const Artista = sequelize.define('Artista', {
      nome: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      generoMusical: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });

  Artista.associate = function(models) {
      // Um artista pode ter vários discos
      Artista.hasMany(models.Disco, { foreignKey: 'artistaId' });
      // Um artista pode ter vários gêneros musicais
      Artista.belongsToMany(models.Genero, { through: 'ArtistaGeneros' });
  };

  return Artista;
};
