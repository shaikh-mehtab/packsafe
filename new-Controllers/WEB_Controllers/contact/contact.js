const { getIP } = require("../../../utils/clientIp");
const db = require("../../../utils/db");
const { fetchContactContent, fetchCartData } = require("../utils/dbUtils");

exports.contactControllers = async (req, res, next) => {
  try {
    const { globalContent, store_setting, store, main_menu } =
      await fetchContactContent();
    const cart = await fetchCartData(req);
    var user = req.session.user || {};
    res.render("contact", {
      globalContent,
      cart,
      store_setting,
      main_menu,
      store,
      user,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};

exports.contactFormControllers = async (req, res, next) => {
  try {
    const { name, enq_for, email, phone, message, subject } = req.body;
    if (!name || typeof name !== "string") {
      throw new Error("Invalid Name");
    }
    if (!email || typeof email !== "string") {
      throw new Error("Invalid email");
    }
    if (!message || typeof message !== "string") {
      throw new Error("Invalid Message");
    }
    if (!subject || typeof subject !== "string") {
      throw new Error("Invalid subject");
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      throw new Error("Invalid phone number");
    }
    const ip = getIP(req);
    const [response] = await db.query(
      "insert into enquiry (name,enq_for,email,phone,message,subject,ip) values(?,?,?,?,?,?,?)",
      [name, enq_for, email, phone, message, subject, ip]
    );
    res.json({
      status: "success",
      message: "Enquiry Submitted Successfully",
      response: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
