const router = require('express').Router();
const usuarioController = require('../controllers/usuarioController');
const isUsuario = require('../middlewares/isUsuario');
const isAdmin = require('../middlewares/isAdmin');
const verifyUserChanges = require('../middlewares/verifyUserChanges');

//Endpoints CRUD
//GET
router.get("/yo", isUsuario, usuarioController.getMe);
router.get("/yo/privilegios", isUsuario, usuarioController.getPrivileges);
router.get("/todos", isUsuario, isAdmin, usuarioController.getAllAsAdmin);
router.get("/:id", isUsuario, isAdmin, usuarioController.getUser);
//CREATE
//UPDATE
router.post("/yo", isUsuario, verifyUserChanges, usuarioController.updateMe);
router.post("/privilegiosup", isUsuario, isAdmin, usuarioController.putPrivilege);
router.post("/privilegiosdown", isUsuario, isAdmin, usuarioController.removePrivilege);
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