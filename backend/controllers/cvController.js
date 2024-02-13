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

const getUserCVs = async (req, res) => {
  const userId = req.user.id;
  const CVs = await cvService.getCVsByUserId(userId);
  res.json(CVs);
};

const createCV = async (req, res) => {
  const body = req.body;
  const user = req.user;

  const savedCV = await cvService.createCV(body, user.id);
  await userService.addCV(user.id, savedCV.id);

  res.json(savedCV);
};

const updateCVById = async (req, res) => {
  const id = req.params.id;
  const cv = await cvService.getCVById(id);

  if (!cv) {
    return res.status(404).end();
  }

  const body = req.body;
  const user = req.user;

  const updatedCV = await cvService.updateCVById(id, body, user.id);

  res.json(updatedCV);
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
  getUserCVs,
  createCV,
  updateCVById,
  deleteCVById,
};
