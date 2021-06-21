const { contact: service } = require("../../services");

const getAll = async (req, res, next) => {
  const { query } = req;
  try {
    console.log("no error");
    const result = await service.getAll(query);
    res.json({
      status: "success",
      query: query,
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    console.log("error");
    next(error);
  }
};

module.exports = getAll;
