const userService = require('../services/userService');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).end();
  }

  res.json(user);
};

const getCurrentUser = async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  res.json(user);
};

const updateCurrentUser = async (req, res) => {
  let { username, currentPassword, newPassword } = req.body;
  if (!(username || (currentPassword && newPassword))) {
    return res.status(400).json({
      error: 'missing required fields',
    });
  }
  if (username) {
    username = username.toLowerCase();
  }

  if (newPassword) {
    const user = await userService.getUserByUsername(req.user.username);
    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(401).json({
        error: 'incorrect current password',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: 'password must be at least 8 characters long',
      });
    }

    const saltRounds = 10;
    var passwordHash = await bcrypt.hash(newPassword, saltRounds);
  }

  const updatedUser = await userService.updateUserById(req.user.id, {
    username,
    passwordHash,
  });
  res.json(updatedUser);
};

const createUser = async (req, res, next) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: 'missing required fields',
    });
  }
  username = username.toLowerCase();

  if (password.length < 8) {
    return res.status(400).json({
      error: 'password must be at least 8 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await userService.createUser(username, passwordHash);
  return res.json(user);
};

const deleteUser = async (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      error: 'missing required fields',
    });
  }
  const user = await userService.getUserByUsername(req.user.username);
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'incorrect current password',
    });
  }

  const id = user.id;
  await userService.deleteUserById(id);
  res.status(204).end();
};

module.exports = {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateCurrentUser,
  createUser,
  deleteUser,
};
