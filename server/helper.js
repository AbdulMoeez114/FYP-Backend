const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { sendgrid_API, EMAIL } = require("./config/dev");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendgrid_API,
    },
  })
);

function sendEmail(chapter, list, upload) {
  const text = "<h3>A new " + upload + "for the Chapter: " + chapter + "</h3>";
  console.log(list);
  transporter.sendMail({
    to: list,
    from: "moeezslamat373@gmail.com",
    subject: "New " + upload,
    html: text,
  });
}

module.exports = { sendEmail };
