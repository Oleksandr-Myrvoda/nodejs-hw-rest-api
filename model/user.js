const { model } = require("mongoose");

const { userSchema } = require("./schemas");

const User = model("contact", userSchema);

module.exports = User;
