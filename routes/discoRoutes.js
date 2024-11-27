

const express = require('express');
const router = express.Router();
const multer = require('multer');
const discoController = require('../controllers/discoController');

// Configuração do multer para upload de imagens
const upload = multer({ dest: 'uploads/' });

router.get('/novo', discoController.getFormulario);
router.post('/novo', upload.single('capa'), discoController.criarDisco);
router.get('/', discoController.listarDiscos);

module.exports = router;

router.get('/editar/:id', async (req, res) => {
    const disco = await Disco.findByPk(req.params.id, { include: ['faixas'] });
    res.render('editarDisco', { disco });
  });
  
  router.post('/editar/:id', async (req, res) => {
    const { titulo, anoLancamento, faixas } = req.body;
    const disco = await Disco.findByPk(req.params.id);
  
    disco.titulo = titulo;
    disco.anoLancamento = anoLancamento;
    await disco.save();
  
    if (faixas) {
      await Faixa.destroy({ where: { discoId: disco.id } });
      const faixasArray = faixas.map(faixa => ({ ...faixa, discoId: disco.id }));
      await Faixa.bulkCreate(faixasArray);
    }
  
    res.redirect('/discos');
  });
  
  router.post('/remover/:id', async (req, res) => {
    await Disco.destroy({ where: { id: req.params.id } });
    res.redirect('/discos');
  });
  