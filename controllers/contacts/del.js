const { contact: service } = require("../../services");

const del = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.del(id);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = del;
