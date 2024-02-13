const { CV } = require('../models');

const getCVById = async (id) => {
  return await CV.findById(id);
};

const createCV = async (body, userId) => {
  const cv = new CV({
    ...body,
    user: userId,
  });

  return await cv.save();
};

const updateCVById = async (cvId, body, userId) => {
  const cv = {
    ...body,
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
