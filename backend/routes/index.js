const router = require('express').Router();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const cvRoutes = require('./cvRoutes');

router.use('/users', userRoutes);
router.use('/login', loginRoutes);
router.use('/cvs', cvRoutes);

module.exports = router;
