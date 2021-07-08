const { users: services } = require("../../services");
const sendMail = require("../../utils");

const resendVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = await services.getOne({ email });

  try {
    if (!email) {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "missing required field email",
      });
    }
    if (user.verify) {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "Verification has already been passed",
      });
    }

    await sendMail(email, user.verificationToken);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerify;
