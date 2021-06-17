const { contact: service } = require("../../services");
const contactSchema = require("../../services/validation");

const updateOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.updateOne(id, req.body);
    const { error } = contactSchema.validate(result);
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

module.exports = updateOne;
