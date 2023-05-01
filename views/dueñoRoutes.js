const dueñoController = require('../controllers/dueñoController');
const isDueño = require('../middlewares/isDueño');
const isUsuario = require('../middlewares/isUsuario');
const router = require('express').Router();

router.get('/perros', isUsuario, isDueño, dueñoController.getMyPerros);
router.get('/perro/:id', isUsuario, isDueño, dueñoController.getMyPerro);

module.exports = router;