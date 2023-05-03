//Import express router
const router = require('express').Router();
//Import routes
const usuarioRoutes = require ('./views/usuarioRoutes');
const authRoutes = require ('./views/authRoutes');
const dueñoRoutes = require ('./views/dueñoRoutes');
    //falta cuidadorRoutes

//Using imported routes
router.use('/usuario', usuarioRoutes);
router.use('/auth', authRoutes);
router.use('/dueno', dueñoRoutes);
// router.use('/cuidador', cuidadorRoutes);

//Export router
module.exports = router;