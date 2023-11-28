const nodeMailer = require(`nodemailer`);

const sendEmail = async (option) => {
  let transporter = nodeMailer.createTransport({
    host: `gmail`,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  let mailOptions = {
    from: `mostafaaabdalla11@gmail.com`,
    to: option.email,
    subject: option.subject,
    text: option.massage,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
