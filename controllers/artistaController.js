const Artista = require('../models/Artista');  // Certifique-se de que o modelo está sendo importado corretamente

// Função para listar os artistas
const listarArtistas = async (req, res) => {
  try {
    const artistas = await Artista.findAll();  // Buscando todos os artistas do banco
    res.render('listarArtistas', { artistas });  // Renderizando a view com os artistas
  } catch (error) {
    console.error('Erro ao listar artistas:', error);
    res.status(500).send('Erro ao listar artistas');
  }
};

module.exports = {
  listarArtistas,
  // outras funções
};
