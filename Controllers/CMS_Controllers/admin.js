const db = require("../../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const clientIp = require("../../utils/clientIp");

const getAllAdmin = async (req, res) => {
  try {
    const admin = await db.execute("select * from admin where status >=0");

    if (admin[0].length > 0) {
      res.status(200).json({
        status: true,
        data: admin[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const admin = await db.execute(
      "select * from admin where (id =? and status >=0) ",
      [id]
    );

    if (admin[0][0]?.id) {
      res.status(200).json({
        status: true,
        data: admin[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, address, phone, image } = req.body;
    const ip = clientIp.getIP(req);
    const emailCheck = await db.execute(
      "select email from admin users where email=?",
      [email]
    );
    if (emailCheck[0].length > 0) {
      return res.status(409).json({
        status: false,
        message: "Email Already exists",
      });
    }
    const userNameCheck = await db.execute(
      "select name from users where name=?",
      [name]
    );
    if (userNameCheck[0].length > 0) {
      return res.status(409).json({
        status: false,
        message: "Username Already exists",
      });
    }
    let hashedPasswords = await bcrypt.hash(password, 10);
    const result = await db.execute(
      "insert into admin (name,email,password,address,phone,status,image,ip) values (?,?,?,?,?,?,?,?)",
      [name, email, hashedPasswords, address, phone, 1, image, ip]
    );
    res.status(200).json({
      status: true,
      message: "Admin Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdAdminDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const { name, email, address, phone, image, status } = req.body;
    const result = await db.execute(
      "update admin set name =? , email=? , address=? , phone=? , image=? , status=? where id = ?",
      [name, email, address, phone, image, status, id]
    );
    res.json({ status: true, message: "Admin Updated Successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdminCheck = await db.execute(
      "select superadmin from admin where id=?",
      [id]
    );
    if (superAdminCheck[0][0].superadmin) {
      return res
        .status(409)
        .json({ status: false, message: "Cannot Delete Super Admin" });
    }
    const result = await db.execute("update admin set status=-1 where id = ?", [
      id,
    ]);
    if (result[0].affectedRows) {
      return res.status(204).json({
        status: true,
        message: " Admin deleted successfully",
      });
    } else {
      return res.status(500).json({
        status: false,

        message: " Server Error ",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllAdmin,
  getByIdAdmin,
  updateByIdAdminDetails,
  createAdmin,
  deleteAdmin,
};