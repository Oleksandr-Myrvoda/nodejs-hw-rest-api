require("dotenv").config();

const { GMAIL_PASSWORD } = process.env;

const config = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mirvoda2@gmail.com",
    pass: GMAIL_PASSWORD,
  },
};

module.exports = config;
