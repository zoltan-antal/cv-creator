const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../services/userService');
const config = require('../utils/config');

const login = async (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();

  const user = await userService.getUserByUsername(username);
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: 'Incorrect username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, config.AUTH_SECRET);

  res.status(200).send({ token, username: user.username, id: user.id });
};

module.exports = { login };
