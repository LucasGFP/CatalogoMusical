const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');  // Certifique-se que esse caminho está correto

// Defina as rotas corretamente
router.get('/', artistaController.listarArtistas);  // Aqui é a função que está sendo chamada no controlador

module.exports = router;
