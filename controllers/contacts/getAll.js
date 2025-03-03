const { contact: service } = require("../../services");

const getAll = async (req, res, next) => {
  const { query } = req;
  try {
    const result = await service.getAll(query);
    res.json({
      status: "success",
      code: 200,
      query: query,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
