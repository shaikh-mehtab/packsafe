const db = require("../../utils/db");
const clientIp = require("../../utils/clientIp");

const getAllLengthClass = async (req, res) => {
  try {
    const LengthClass = await db.execute(
      "select * from length_class where status >= 0"
    );

    if (LengthClass[0].length > 0) {
      res.status(200).json({
        status: true,
        data: LengthClass[0],
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

const getByIdLengthClass = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const LengthClass = await db.execute(
      "select * from length_class where (id =? and status>=0)",
      [id]
    );

    if (LengthClass[0][0]?.id) {
      res.status(200).json({
        status: true,
        data: LengthClass[0],
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

const createLengthClass = async (req, res) => {
  try {
    const { name, slug, description, sort_order, inserted_by } = req.body;
    const ip = clientIp.getIP(req);
    const result = await db.execute(
      "insert into length_class (name,description,sort_order,inserted_by,status,ip) values (?,?,?,?,?,?)",
      [name, description, sort_order, inserted_by, 1, ip]
    );
    res.status(200).json({
      status: true,
      message: "LengthClass Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdLengthClass = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const { name, description, sort_order, updated_by, status } = req.body;
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);
    const result = await db.execute(
      "update length_class set name =? , description=? , sort_order=? , updated_by=? ,status=? where id = ?",
      [name, description, sort_order, updated_by, status, id]
    );
    res.json({ status: true, message: "LengthClass Updated Successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteLengthClass = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.execute(
      "update length_class set status=-1 where id = ?",
      [id]
    );
    if (result[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: " LengthClass deleted successfully",
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
  getAllLengthClass,
  getByIdLengthClass,
  updateByIdLengthClass,
  createLengthClass,
  deleteLengthClass,
};
