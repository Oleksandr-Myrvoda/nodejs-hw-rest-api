const { users: servises } = require("../../services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getCurrent = async (res, req, next) => {
  try {
    const { TOKEN_KEY } = process.env;
    const [, token] = req.headers.Authorization.split(" ");
    const { id } = jwt.verify(token, TOKEN_KEY);
    const user = await servises.getById(id);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: user,
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
