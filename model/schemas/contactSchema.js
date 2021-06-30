const { Schema, ObjectId } = require("mongoose");

const contactSchema = Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 50,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: ObjectId,
    ref: "user",
  },
});

module.exports = contactSchema;
