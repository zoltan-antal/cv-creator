const passport = require('passport');
const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  userController.getCurrentUser
);
router.patch(
  '/me',
  passport.authenticate('jwt', { session: false }),
  userController.updateCurrentUser
);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
);

module.exports = router;
