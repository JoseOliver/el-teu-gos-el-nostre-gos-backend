//Import express router
const router = require('express').Router();
//Import routes
const usuarioRoutes = require ('./views/usuarioRoutes');
const authRoutes = require ('./views/authRoutes');
const dueñoRoutes = require ('./views/dueñoRoutes');

//Using imported routes
router.use('/usuario', usuarioRoutes);
router.use('/auth', authRoutes);
router.use('/dueno', dueñoRoutes);

//Export router
module.exports = router;