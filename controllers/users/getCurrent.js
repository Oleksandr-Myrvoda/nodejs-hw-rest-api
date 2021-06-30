const { users: servises } = require("../../services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getCurrent = async (res, req, next) => {
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        result: req.user,
      },
    });
  } catch (error) {
    res.status(403).json({
      status: "error",
      code: 403,
      message: "Invalid token",
    });
  }
};

module.exports = getCurrent;
