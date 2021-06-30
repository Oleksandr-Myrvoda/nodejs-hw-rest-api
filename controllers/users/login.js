const { users: servises } = require("../../services");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await servises.getOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Invalid login or password",
      });
    }

    const payload = {
      id: user._id,
    };
    const { TOKEN_KEY } = process.env;
    const token = jwt.sign(payload, TOKEN_KEY);
    await servises.update(user._id, { ...user, token });
    user.token = token;

    res.json({
      status: "success",
      code: 200,
      data: {
        token: user.token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Invalid some fields",
    });
    next(error);
  }
};

module.exports = login;
