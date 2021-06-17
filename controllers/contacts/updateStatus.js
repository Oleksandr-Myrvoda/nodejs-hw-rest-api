const { contact: service } = require("../../services");

const updateStatus = async (req, res, next) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  try {
    const result = await service.updateStatus(contactId, favorite);
    if (!favorite) {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "missing field favorite",
      });
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact favorite status changed",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;
