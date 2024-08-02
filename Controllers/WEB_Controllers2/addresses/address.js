const { fetchCartData, fetchAddressContent } = require("../utils/dbUtils");
const db = require("../../../utils/db");
const clientIp = require("../../../utils/clientIp");

exports.getAllAddresses = async (req, res) => {
  try {
    const Addresses = await db.execute(
      "select * from addresses where user_id =?",
      [req.session.user.id]
    );

    if (Addresses[0].length > 0) {
      res.status(200).json({
        status: true,
        data: Addresses[0],
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

exports.getByIdAddresses = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const Addresses = await db.execute(
      "select * from addresses where (id =? )",
      [id]
    );

    if (Addresses[0][0]?.id) {
      res.status(200).json({
        status: true,
        data: Addresses[0],
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

exports.createAddresses = async (req, res) => {
  try {
    const {
      name,
      phone_no,
      locality,
      address,
      city,
      state,
      landmark,
      alt_phone,
      addr_type,
      pincode,
    } = req.body;
    const ip = clientIp.getIP(req);
    const user_id = req.body.user_id;
    if (!user_id) {
      res.json({ status: false, message: "Invalid user id provided" });
    }
    const result = await db.execute(
      "insert into addresses (user_id,name,phone_no,locality,address,city,state,landmark,alt_phone,addr_type,status,pincode,ip) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        phone_no,
        locality,
        address,
        city,
        state,
        landmark,
        alt_phone,
        addr_type,
        1,
        pincode,
        ip,
      ]
    );
    res.status(200).json({
      status: true,
      message: "Address Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateByIdAddresses = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const {
      name,
      phone_no,
      locality,
      address,
      city,
      email,
      state,
      landmark,
      alt_phone,
      addr_type,
      pincode,
    } = req.body;
    if (!name || typeof name !== "string") {
      throw new Error("Invalid name");
    }
    if (!address || typeof address !== "string") {
      throw new Error("Invalid address");
    }
    if (!city || typeof city !== "string") {
      throw new Error("Invalid city");
    }
    if (!state || typeof state !== "string") {
      throw new Error("Invalid state");
    }
    if (!landmark || typeof landmark !== "string") {
      throw new Error("Invalid landmark");
    }
    if (!locality || typeof locality !== "string") {
      throw new Error("Invalid locality");
    }
    if (!phone_no || !/^\d{10}$/.test(phone_no)) {
      throw new Error("Invalid phone number");
    }
    if (!alt_phone || !/^\d{10}$/.test(alt_phone)) {
      throw new Error("Invalid alternate phone number");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email");
    }
    const result = await db.execute(
      "update addresses set name =?,phone_no=?,email=?,locality=?,address=?,city=?,state=?,landmark=?,alt_phone=?,addr_type=?,pincode=? where id = ?",
      [
        name,
        phone_no,
        email,
        locality,
        address,
        city,
        state,
        landmark,
        alt_phone,
        addr_type,
        pincode,
        id,
      ]
    );
    res.json({ status: true, message: "Addresses Updated Successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteAddresses = async (req, res) => {
  try {
    const { id } = req.params;

    //update status Addresses to -2 so it stays in database for analytics
    const result = await db.execute(
      "update addresses set status=-2 where id = ?",
      [id]
    );
    if (result[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: " Addresses deleted successfully",
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

exports.addressController = async (req, res, next) => {
  try {
    const { globalContent, store_setting, store, main_menu } =
      await fetchAddressContent();
    const cart = await fetchCartData(req);
    var user = req.session.user || {};
    if (!user.id) {
      res.render("404");
    } else {
      const [addresses] = await db.execute(
        "select * from addresses where user_id =?",
        [req.session.user.id]
      );
      res.render("address", {
        globalContent,
        cart,
        store_setting,
        main_menu,
        store,
        user,
        addresses,
      });
    }
  } catch (error) {
    res.render("500");
  }
};
