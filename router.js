//Import express router
const router = require('express').Router();
//Import routes
const userRoutes = require ('./views/userRoutes');

//Using imported routes
router.use('/users', userRoutes);

//Export router
module.exports = router;