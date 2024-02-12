const cvService = require('../services/cvService');
const userService = require('../services/userService');

const getCVById = async (req, res) => {
  const id = req.params.id;
  const cv = await cvService.getCVById(id);

  if (!cv) {
    return res.status(404).end();
  }

  res.json(cv);
};

const createCV = async (req, res) => {
  const body = req.body;
  const user = req.user;

  const savedCV = await cvService.createCV(body, user.id);
  await userService.addCV(user.id, savedCV.id);

  res.json(savedCV);
};

const deleteCVById = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const cv = await cvService.getCVById(id);

  if (!cv) {
    return res.status(404).end();
  }

  await cvService.deleteCVById(id);
  await userService.removeCV(user.id, id);

  res.status(204).end();
};

module.exports = {
  getCVById,
  createCV,
  deleteCVById,
};
