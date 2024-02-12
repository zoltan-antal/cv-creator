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

const updateCVById = async (cvId, content, userId) => {
  const cv = {
    content,
    user: userId,
  };

  return await CV.findByIdAndUpdate(cvId, cv, {
    new: true,
    runValidators: true,
    context: 'query',
  });
};

const deleteCVById = async (id) => {
  return await CV.findByIdAndDelete(id);
};

module.exports = {
  getCVById,
  createCV,
  updateCVById,
  deleteCVById,
};
