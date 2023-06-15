//Import express router
const router = require('express').Router();
//Import routes
const usuarioRoutes = require ('./views/usuarioRoutes');
const authRoutes = require ('./views/authRoutes');
const dueñoRoutes = require ('./views/dueñoRoutes');
const cuidadorRoutes = require ('./views/cuidadorRoutes');
const autorRoutes = require ('./views/autorRoutes');

//Using imported routes
router.use('/usuario', usuarioRoutes);
router.use('/auth', authRoutes);
router.use('/dueno', dueñoRoutes);
router.use('/cuidador', cuidadorRoutes);
router.use('/autor', autorRoutes);

//Export router
module.exports = router;