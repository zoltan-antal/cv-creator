const { User, CV } = require('../models');

const getAllUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  return await User.findById(id).populate('CVs', {
    name: 1,
    id: 1,
  });
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

const updateUserById = async (id, fields) => {
  return await User.findByIdAndUpdate(id, fields, {
    new: true,
    runValidators: true,
    context: 'query',
  });
};

const deleteUserById = async (id) => {
  await CV.deleteMany({ user: id });
  return await User.findByIdAndDelete(id);
};

const addCV = async (userId, cvId) => {
  const user = await User.findById(userId);
  user.CVs = [...user.CVs, cvId];
  return await user.save();
};

const removeCV = async (userId, cvId) => {
  const user = await User.findById(userId);
  user.CVs = user.CVs.filter((id) => id.toString() !== cvId);
  return await user.save();
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUserById,
  deleteUserById,
  addCV,
  removeCV,
};
