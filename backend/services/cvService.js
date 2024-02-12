const { CV } = require('../models');

const getCVById = async (id) => {
  return await CV.findById(id);
};

const createCV = async (content, userId) => {
  const cv = new CV({
    content,
    user: userId,
  });

  return await cv.save();
};

const deleteCVById = async (id) => {
  return await CV.findByIdAndDelete(id);
};

module.exports = {
  getCVById,
  createCV,
  deleteCVById,
};
