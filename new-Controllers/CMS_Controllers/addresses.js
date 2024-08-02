const db = require("../../utils/db");
const clientIp = require("../../utils/clientIp");

const getAllAddresses = async (req, res) => {
  try {
    const Addresses = await db.execute("select * from addresses");

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

const getByIdAddresses = async (req, res) => {
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

const createAddresses = async (req, res) => {
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
    const result = await db.execute(
      "insert into addresses (name,phone_no,locality,address,city,state,landmark,alt_phone,addr_type,status,pincode,ip) values (?,?,?,?,?,?,?,?,?,?,?,?)",
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

const updateByIdAddresses = async (req, res) => {
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
      state,
      landmark,
      alt_phone,
      addr_type,
      pincode,
      status,
    } = req.body;
    console.log(req.body);
    const result = await db.execute(
      "update addresses set name =? , phone_no=?,locality=?,address=?,city=?,state=?,landmark=?,alt_phone=?,addr_type=?,pincode=?,status=?  where id = ?",
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
        pincode,
        status,
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

const deleteAddresses = async (req, res) => {
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

module.exports = {
  getAllAddresses,
  getByIdAddresses,
  updateByIdAddresses,
  createAddresses,
  deleteAddresses,
};
