const { contact: service } = require("../../services");
const { validation: contactSchema } = require("../../services");

const updateOne = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.updateOne(contactId, req.body);
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
