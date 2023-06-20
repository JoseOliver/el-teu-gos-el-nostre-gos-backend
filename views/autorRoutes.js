const autorController = require('../controllers/autorController');
const isAutor = require('../middlewares/isAutor');
const isUsuario = require('../middlewares/isUsuario');
const verifyEntradaChanges = require('../middlewares/verifyEntradaChanges');
const router = require('express').Router();

router.get('/entradas', isUsuario, isAutor, autorController.getMyEntradas);
router.post('/entrada', isUsuario, isAutor, autorController.createEntrada);
router.put('/entrada/:id', isUsuario, isAutor, verifyEntradaChanges, autorController.updateEntrada);

module.exports = router;