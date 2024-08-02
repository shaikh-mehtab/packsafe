const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getallEnquiry = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from enquiry where status>=0"
    );
    if (!data && data.length == 0) {
      return res.status(400).send({
        status: false,
        message: "No records founds",
      });
    }
    res.status(200).send({
      status: true,
      message: "All data found",
      totaldata: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getByIdEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or Provide an id",
      });
    }

    const data = await connection.query(
      `select * from enquiry where id=${id} && status>=0`
    );
    if (!data[0][0]?.id) {
      res.status(400).send({
        status: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      status: true,
      message: "Single data found",
      totaldata: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const createEnquiry = async (req, res) => {
  try {
    const { name, enq_for, email, phone, message, remark, status, subject } =
      req.body;

    const ip = clientIp.getIP(req);

    const data = await connection.query(
      "INSERT into enquiry(  name,enq_for, email,phone,message,remark,status,subject,ip) VALUES(?,?,?,?,?,?,?,?,?)",
      [name, enq_for, email, phone, message, remark, status, subject, ip]
    );
    res.status(200).send({
      status: true,
      data: data[0],
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const ip = clientIp.getIP(req);
    const { name, enq_for, email, phone, message, remark, status, subject } =
      req.body;

    const data = await connection.query(
      `UPDATE enquiry SET name=?,
      enq_for=?,
      email=?,
      phone=?,
      message=?,
      remark=?,
      status=?,
      ip=?,
      subject=? 
      WHERE id=${id}`,
      [name, enq_for, email, phone, message, remark, status, ip, subject]
    );

    if (data[0].changedRows) {
      return res.status(200).send({
        status: true,
        message: "Successfully Updated data",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).send({
        status: false,
        message: "Something Went wrong",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const deleteByIdEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or provide an Id",
      });
    }

    const data = await connection.query(
      `UPDATE enquiry SET status=-1 WHERE id=${id}`,
      [id]
    );

    if (data[0].affectedRows) {
      return res.status(200).send({
        status: true,
        message: "Deleted successfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).send({
        status: false,
        message: "Something Went Wrong",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getallEnquiry,
  getByIdEnquiry,
  updateByIdEnquiry,
  createEnquiry,
  deleteByIdEnquiry,
};
