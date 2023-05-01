const router = require('express').Router();
const usuarioController = require('../controllers/usuarioController');
const isUsuario = require('../middlewares/isUsuario');
const isAdmin = require('../middlewares/isAdmin');
const verifyUserChanges = require('../middlewares/verifyUserChanges');

//Endpoints CRUD
//CREATE
//RETRIEVE
router.get("/yo", isUsuario, usuarioController.getMe);
router.get("/yo/privilegios", isUsuario, usuarioController.getPrivileges);
router.get("/todos", isUsuario, isAdmin, usuarioController.getAllAsAdmin);
router.get("/:id", isUsuario, isAdmin, usuarioController.getUser);
//UPDATE
router.post("/yo", isUsuario, verifyUserChanges, usuarioController.updateMe);
router.post("/privilegiosup", isUsuario, isAdmin, usuarioController.putPrivilege);
router.post("/privilegiosdown", isUsuario, isAdmin, usuarioController.removePrivilege);
//DELETE

//export router
module.exports = router;