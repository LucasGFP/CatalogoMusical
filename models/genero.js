module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define('Genero', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Genero.associate = function(models) {
        // Gênero pode ter muitos discos
        Genero.belongsToMany(models.Disco, { through: 'DiscoGeneros' });
        // Gênero pode ter muitos artistas
        Genero.belongsToMany(models.Artista, { through: 'ArtistaGeneros' });
    };

    return Genero;
};
