const usuarioController = require('../controllers/usuarioController');

const router = require('express').Router();
//Import dependencies

const isUsuario = require('../middlewares/isUsuario');
const isAdmin = require('../middlewares/isAdmin');

//Endpoints CRUD
//GET
router.get("/yo", isUsuario, usuarioController.getMe);
router.get("/yo/privilegios", isUsuario, usuarioController.getPrivileges);
router.get("/todos", isUsuario, isAdmin, usuarioController.getAllAsAdmin);
//CREATE
//UPDATE
//DELETE

/* router.get("/", verifyToken, isDoctor, userController.getAllUsersAsDoctor);
router.get("/me", verifyToken, userController.getMyUser);
router.put("/me", verifyToken, verifyUserChanges, userController.updateMyUser); */

//Extras

/* router.get("/admin", verifyToken, isAdmin, userController.getAllUsersAsAdmin);
router.get("/my/doctors", verifyToken, userController.getMyDoctors);
router.get("/my/services", verifyToken, userController.getMyServices); */

//export router
module.exports = router;