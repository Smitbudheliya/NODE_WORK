const nodeMailer = require('nodemailer');

module.exports.sendEmail = async (message) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, 
    auth: {
      user: "vitthanishubham@gmail.com",
      pass: "kmvseelhtmwzgwqv",
    },
  });

  let res = await transporter.sendMail(message);
  return res;
};
