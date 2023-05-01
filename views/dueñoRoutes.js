const dueñoController = require('../controllers/dueñoController');
const isDueño = require('../middlewares/isDueño');
const isUsuario = require('../middlewares/isUsuario');
const verifyPerroChanges = require('../middlewares/verifyPerroChanges');
const router = require('express').Router();
//create
router.post('/perro', isUsuario, isDueño, dueñoController.newPerro);
router.post('/estancia', isUsuario, isDueño, dueñoController.newEstancia);
//retrieve
router.get('/perros', isUsuario, isDueño, dueñoController.getMyPerros);
router.get('/perro/:id', isUsuario, isDueño, dueñoController.getMyPerro);
//update
router.put('/perro', isUsuario, isDueño, verifyPerroChanges, dueñoController.updatePerro)
module.exports = router;