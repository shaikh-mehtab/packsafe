const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (req, res) => {
  const { ship_address, address, tracking_url, order_id } = await req.body;
  console.log(ship_address, address, tracking_url, order_id);

  // Path to your EJS template file
  const templatePath = path.join(__dirname, "../views/NewTemplate.ejs");

  // Read the EJS template file
  const template = fs.readFileSync(templatePath, "utf-8");

  // Render the template with dynamic data
  const htmlTemplate = ejs.render(template, {
    ship_address,
    address,
    tracking_url,
    order_id,
  });

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: process.env.TO_EMAIL,
    subject: "Your Order has been Dispatched",
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Error sending email",
        error: error.toString(),
      });
    } else {
      console.log("Email sent successfully: " + info.response);
      res
        .status(200)
        .json({ status: true, message: "Email sent successfully" });
    }
  });
};

module.exports = {
  sendEmail,
};
