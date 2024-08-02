const db = require("../../../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, phone_no, profession, password } = req.body;
    if (!name) {
      return res.status(400).send({
        status: false,
        message: "fill the username",
      });
    }

    if (!password) {
      return res.status(400).send({
        status: false,
        message: "fill the password",
      });
    }

    const emailCheck = await db.query("select * from users where email = ?", [
      email,
    ]);

    if (emailCheck[0].length > 0) {
      return res.status(500).json({
        status: false,
        message: "Email Already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (name,email,phone_no,profession, password,status) VALUES (?,?,?,?,?,?)`;

    const data = await db.query(sql, [
      name,
      email,
      phone_no,
      profession,
      hashedPassword,
      1,
    ]);

    if (data) {
      res.status(200).json({ status: true, message: "created successfully" });
    } else {
      res.status(500).json({
        status: false,
        message: "Failed to create user",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    const data = await db.query(sql, [email]);
    const user = data[0];
    if (!user.length > 0) {
      return res.status(401).json({
        message: "Authentication failed: user not found",
      });
    }

    const storedPassword = user[0].password;

    const passwordMatch = await bcrypt.compare(password, storedPassword);

    if (!passwordMatch) {
      return res.status(401).json({
        status: false,
        message:
          "Authentication failed: Password doesn't match. Please try again",
      });
    }

    req.session.user = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    };

    // res.redirect("/");
    res.json({ status: true, message: "cool" });
  } catch (error) {
    console.error("Error logging in: ", error);

    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const verifyToken = (req, res) => {
  try {
    const user = req.session.user;
    res.json({ status: true, user: user });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    req.session.user = null;
    req.session.cart = null;
    res.json({
      status: true,
      message: "logout successfull",
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

module.exports = { register, login, verifyToken, logout };
