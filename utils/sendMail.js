const nodemailer = require("nodemailer");

const nodemailerGmailConfig = require("../configs/nodemailer-gmail-config");

const transporter = nodemailer.createTransport(nodemailerGmailConfig);

const sendMail = async (email, verificationToken) => {
  const emailOptions = {
    to: email,
    from: "murvoda@mail.ru ",
    subject: "Verification token",
    text: `Verify Your account by link: http//:localhost:<YOUR_PORT>/api/v1/users/verify/${verificationToken}`,
  };
  try {
    const result = await transporter.sendMail(emailOptions);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
