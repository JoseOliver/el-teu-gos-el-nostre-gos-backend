const router = require('express').Router();
//Import dependencies
const userController = require ('../controllers/userController');
const isDoctor = require('../middleware/isDoctor');
const verifyUserChanges = require('../middleware/verifyUserChanges');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

//Endpoints CRUD
//GET
//CREATE
//UPDATE
//DELETE
router.get("/", verifyToken, isDoctor, userController.getAllUsersAsDoctor);
router.get("/me", verifyToken, userController.getMyUser);
router.put("/me", verifyToken, verifyUserChanges, userController.updateMyUser);

//Extras
router.get("/admin", verifyToken, isAdmin, userController.getAllUsersAsAdmin);
router.get("/my/doctors", verifyToken, userController.getMyDoctors);
router.get("/my/services", verifyToken, userController.getMyServices);

//export router
module.exports = router;