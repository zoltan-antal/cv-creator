const { User } = require('../models');

const getAllUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const createUser = async (username, passwordHash) => {
  const user = new User({
    username,
    passwordHash,
  });

  return await user.save();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
