const { contact: service } = require("../../services");
const { validation: contactSchema } = require("../../services");

const add = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await service.add(req.body);
    const { error } = contactSchema.validate(result);
    if (!result.name || !result.email || !result.phone) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
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

module.exports = add;
