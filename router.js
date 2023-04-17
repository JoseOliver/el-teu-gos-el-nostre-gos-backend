//Import express router
const router = require('express').Router();
//Import routes
const usuarioRoutes = require ('./views/usuarioRoutes');

//Using imported routes
router.use('/usuario', usuarioRoutes);

//Export router
module.exports = router;