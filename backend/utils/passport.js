const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');
const config = require('../utils/config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.AUTH_SECRET,
};

const configurePassport = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (!user) {
          return done(null, false);
        }
        const userBasic = { username: user.username, id: user.id };
        return done(null, userBasic);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

module.exports = configurePassport;
