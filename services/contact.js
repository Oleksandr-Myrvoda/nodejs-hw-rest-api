const { Contact } = require("../model");

const getAll = (query) => {
  return Contact.find(query);
};

const getOne = (id) => {
  return Contact.findById(id);
};

const add = (body) => {
  return Contact.create(body);
};

const del = (id) => {
  return Contact.findByIdAndDelete(id);
};

const updateOne = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

const updateStatus = (id, favorite) => {
  return Contact.findByIdAndUpdate(id, favorite, { new: true });
};

module.exports = {
  getAll,
  getOne,
  add,
  del,
  updateOne,
  updateStatus,
};
