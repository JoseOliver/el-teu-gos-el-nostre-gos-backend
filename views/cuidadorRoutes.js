const cuidadorController = require('../controllers/cuidadorController');
const isUsuario = require('../middlewares/isUsuario')
const isCuidador = require('../middlewares/isCuidador');
const router = require('express').Router();

router.get('/estancias', isUsuario, isCuidador, cuidadorController.getMyEstancias);
router.get('/estancia/:id', isUsuario, isCuidador, cuidadorController.getMyEstancia);
router.get('/perros', isUsuario, isCuidador, cuidadorController.getMyPerros);
router.get('/perro/:id', isUsuario, isCuidador, cuidadorController.getMyPerro);

module.exports = router;