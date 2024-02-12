const passport = require('passport');
const router = require('express').Router();
const cvController = require('../controllers/cvController');

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  cvController.getCVById
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  cvController.createCV
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  cvController.updateCVById
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  cvController.deleteCVById
);

module.exports = router;
