

const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const artistaRoutes = require('./routes/artistaRoutes');
const discoRoutes = require('./routes/discoRoutes');
const { Op } = require('sequelize'); // Para buscas

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (se necessário para CSS ou imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
  res.render('home'); // Página inicial com opções de navegação
});

// Busca (filtros por título, artista ou gênero)
app.get('/buscar', async (req, res) => {
  const { titulo, artista, genero } = req.query;

  try {
    const discos = await require('./models/Disco').findAll({
      where: {
        ...(titulo && { titulo: { [Op.iLike]: `%${titulo}%` } }),
      },
      include: [
        {
          model: require('./models/Artista'),
          as: 'artista',
          where: {
            ...(artista && { nome: { [Op.iLike]: `%${artista}%` } }),
            ...(genero && { generoMusical: { [Op.iLike]: `%${genero}%` } }),
          },
          required: false,
        },
      ],
    });

    res.render('resultadoBusca', { discos });
  } catch (error) {
    console.error('Erro ao buscar:', error);
    res.status(500).send('Erro ao processar a busca.');
  }
});

// Rotas específicas para artistas e discos
app.use('/artistas', artistaRoutes);
app.use('/discos', discoRoutes);

// Sincronização do banco e inicialização
sequelize
  .sync({ force: false }) // force: false mantém os dados; force: true recria tabelas
  .then(() => {
    console.log('Banco sincronizado.');
    app.listen(3000, () => console.log('Servidor rodando na porta 3000.'));
  })
  .catch(err => console.error('Erro ao sincronizar o banco:', err));
