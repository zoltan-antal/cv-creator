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

const createUser = async (req, res, next) => {
  let { username, password } = req.body;
  username = username.toLowerCase();

  if (password.length < 8) {
    return res.status(400).json({
      error: 'password must be at least 8 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const user = await userService.createUser(username, passwordHash);
    return res.json(user);
  } catch (error) {
    if (error.errors.username && error.errors.username.kind === 'unique') {
      return res.status(409).json({
        error: `user with username '${username}' already exists`,
      });
    }
    next(error);
  }
};

const deleteUser = async (req, res) => {
  const id = req.user.id;
  await userService.deleteUserById(id);
  res.status(204).end();
};

module.exports = {
  getAllUsers,
  getUserById,
  getCurrentUser,
  createUser,
  deleteUser,
};
