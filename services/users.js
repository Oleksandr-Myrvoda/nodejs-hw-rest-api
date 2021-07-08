const { User } = require("../model");

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => {
  return User.findById(id);
};

const add = ({ email, password, avatarURL }) => {
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  return newUser.save();
};

const updateOne = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  getOne,
  getById,
  add,
  updateOne,
};
