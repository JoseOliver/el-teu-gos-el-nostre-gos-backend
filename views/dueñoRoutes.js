const dueñoController = require('../controllers/dueñoController');
const isDueño = require('../middlewares/isDueño');
const isUsuario = require('../middlewares/isUsuario');
const verifyEstanciaChanges = require('../middlewares/verifyEstanciaChanges');
const verifyPerroChanges = require('../middlewares/verifyPerroChanges');
const router = require('express').Router();
//create
router.post('/perro', isUsuario, isDueño, verifyPerroChanges, dueñoController.newPerro);
router.post('/estancia', isUsuario, isDueño, verifyEstanciaChanges, dueñoController.newEstancia);
//retrieve
router.get('/perros', isUsuario, isDueño, dueñoController.getMyPerros);
router.get('/perro/:id', isUsuario, isDueño, dueñoController.getMyPerro);
router.get('/estancias', isUsuario, isDueño, dueñoController.getMyEstancias);
router.get('/cuidadores', isUsuario, isDueño, dueñoController.getCuidadores);
//update
router.put('/perro', isUsuario, isDueño, verifyPerroChanges, dueñoController.updatePerro);
router.put('/estancia', isUsuario, isDueño, verifyEstanciaChanges, dueñoController.updateMyEstancia);
module.exports = router;