//Import express router
const router = require('express').Router();
//Import routes
const usuarioRoutes = require ('./views/usuarioRoutes');
const authRoutes = require ('./views/authRoutes');

//Using imported routes
router.use('/usuario', usuarioRoutes);
router.use('/auth', authRoutes);

//Export router
module.exports = router;