const { users: services } = require("../../services");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendMail = require("../../utils");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await services.getOne({ email });
    if (result) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }

    const verificationToken = v4();
    await sendMail(email, verificationToken);
    const avatarURL = gravatar.url(email).substr(2);
    const user = await services.add({
      email,
      password,
      avatarURL,
      verificationToken,
    });

    res.status(201).json({
      status: "sucsess",
      code: 201,
      message: "Add sucsess",
      data: {
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

module.exports = signup;
