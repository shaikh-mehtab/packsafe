const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getAllSpecialPrice = async (req, res) => {
  try {
    const Splprices = await connection.query(
      "select * from splprices where status >= 0"
    );

    if (Splprices[0].length > 0) {
      res.status(200).json({
        status: true,
        Splprices: Splprices[0],
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

const getByIdSpecialPrice = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const Splprices = await connection.query(
      "select * from splprices where (id =? and status>=0)",
      [id]
    );

    if (Splprices[0][0]?.id) {
      res.status(200).json({
        status: true,
        Splprices: Splprices[0],
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

const createSpecialPrice = async (req, res) => {
  try {
    const { p_id, name, amount, from_date, to_date, status, sort_order } =
      req.body;
    const ip = clientIp.getIP(req);
    const inserted_by = "admin";
    const updated_by = "packsafe";
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);

    const result = await connection.query(
      "insert into splprices (p_id, name,amount, from_date,to_date,status, sort_order, inserted_by,updated_by, updated_on, ip) values(?,?,?,?,?,?,?,?,?,?,?)",
      [
        p_id,
        name,
        amount,
        from_date,
        to_date,
        status,
        sort_order,
        inserted_by,
        updated_by,
        updated_on,
        ip,
      ]
    );
    res.status(200).json({
      data: result,
      status: true,
      message: "Special Price Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdSpecialPrice = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const { p_id, name, amount, from_date, to_date, status, sort_order } =
      req.body;

    const ip = clientIp.getIP(req);
    const inserted_by = "admin";
    const updated_by = "packsafe";
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);

    const result = await connection.query(
      "update splprices set p_id=?, name=? ,amount=?,from_date=?,to_date=?,status=?, sort_order=?,inserted_by=?,updated_by=?, updated_on=?, ip=? where id = ?",
      [
        p_id,
        name,
        amount,
        from_date,
        to_date,
        status,
        sort_order,
        inserted_by,
        updated_by,
        updated_on,
        ip,
        id,
      ]
    );
    res.json({
      status: true,
      message: "Special Price Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteSpecialPrice = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await connection.query(
      "update splprices set status=-1 where id = ?",
      [id]
    );
    if (result[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: "Special Price deleted successfully",
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Server Error",
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
  getAllSpecialPrice,
  getByIdSpecialPrice,
  updateByIdSpecialPrice,
  createSpecialPrice,
  deleteSpecialPrice,
};
