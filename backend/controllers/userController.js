const userService = require('../services/userService');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  const usersWithoutSensitiveData = users.map((user) => {
    return { id: user.id, username: user.username };
  });
  res.json(usersWithoutSensitiveData);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);

  if (!user) {
    res.status(404).end();
  }

  const userWithoutSensitiveData = {
    id: user.id,
    username: user.username,
  };
  res.json(userWithoutSensitiveData);
};

const createUser = async (req, res) => {
  const { username, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await userService.createUser(username, passwordHash);
  const userWithoutSensitiveData = {
    id: user.id,
    username: user.username,
  };
  res.json(userWithoutSensitiveData);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
