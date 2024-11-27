

const Disco = require('../models/disco');
const Faixa = require('../models/faixa');

// Renderiza o formulário de criação de disco
exports.getFormulario = (req, res) => {
  res.render('formularioDisco');
};

// Cria um novo disco com faixas
exports.criarDisco = async (req, res) => {
  try {
    const { titulo, anoLancamento, faixas } = req.body;
    const capa = req.file ? `/uploads/${req.file.filename}` : null;

    const novoDisco = await Disco.create({ titulo, anoLancamento, capa });

    if (faixas && faixas.length > 0) {
      const faixasArray = faixas.map((faixa) => ({
        ...faixa,
        discoId: novoDisco.id,
      }));
      await Faixa.bulkCreate(faixasArray);
    }

    res.redirect('/discos');
  } catch (error) {
    console.error('Erro ao criar disco:', error);
    res.status(500).send('Erro ao salvar o disco.');
  }
};

// Lista todos os discos com faixas
exports.listarDiscos = async (req, res) => {
  try {
    const discos = await Disco.findAll({ include: { model: Faixa, as: 'faixas' } });
    res.render('listaDiscos', { discos });
  } catch (error) {
    console.error('Erro ao listar discos:', error);
    res.status(500).send('Erro ao listar os discos.');
  }
};
