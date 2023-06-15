const autorController = require('../controllers/autorController');
const isAutor = require('../middlewares/isAutor');
const isUsuario = require('../middlewares/isUsuario');
const router = require('express').Router();

router.get('/entradas', isUsuario, isAutor, autorController.getMyEntradas);

module.exports = router;