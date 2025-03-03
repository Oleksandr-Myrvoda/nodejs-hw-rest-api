const { users: services } = require("../../services");

const logout = async (req, res, next) => {
  const { user } = req.user;
  try {
    await services.updateOne(user._id, { ...user, token: null });
    res.status(204).json({
      status: "sucsess",
      code: 204,
      message: "Success logout",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
