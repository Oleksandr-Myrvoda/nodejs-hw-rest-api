const { contact: service } = require("../../services");

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getOne(contactId);
    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOne;
