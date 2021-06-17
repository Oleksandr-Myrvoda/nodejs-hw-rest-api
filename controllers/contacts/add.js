const { contact: service } = require("../../services");
const contactSchema = require("../../services/validation");

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

// {
// "name":"Reanu Keawes",
// "email":"neo@google.com",
// "phone":"(097)1234567"
// }

module.exports = add;
