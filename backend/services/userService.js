const { User } = require('../models');

const getAllUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const createUser = async (username, passwordHash) => {
  const user = new User({
    username,
    passwordHash,
  });

  return await user.save();
};

const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  deleteUserById,
};
