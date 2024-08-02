const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getAllCoupons = async (req, res) => {
  try {
    const Coupons = await connection.query(
      "select * from coupons where status >= 0"
    );

    if (Coupons[0].length > 0) {
      res.status(200).json({
        status: true,
        Coupons: Coupons[0],
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

const getByIdCoupons = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const Coupons = await connection.query(
      "select * from coupons where (id =? and status>=0)",
      [id]
    );

    if (Coupons[0][0]?.id) {
      res.status(200).json({
        status: true,
        Coupons: Coupons[0],
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

const createCoupons = async (req, res) => {
  try {
    const {
      name,
      description,
      code,
      tnc,
      end_date,
      start_date,
      uses_per_coupon,
      status,
      total_amount,
      discount,
      sort_order,
    } = req.body;
    const ip = clientIp.getIP(req);

    const result = await connection.query(
      "insert into coupons (name, description,code,tnc, end_date,start_date,uses_per_coupon,status,total_amount,discount,sort_order, ip) values(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        description,
        code,
        tnc,
        end_date,
        start_date,
        uses_per_coupon,
        status,
        total_amount,
        discount,
        sort_order,
        ip,
      ]
    );
    res.status(200).json({
      data: result,
      status: true,
      message: "Coupons Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdCoupons = async (req, res) => {
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
      description,
      code,
      tnc,
      end_date,
      start_date,
      uses_per_coupon,
      status,
      total_amount,
      discount,
      sort_order,
    } = req.body;
    const ip = clientIp.getIP(req);
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);
    const result = await connection.query(
      "update coupons set name =?, description=? ,code=?,tnc=?,end_date=?,start_date=?,uses_per_coupon=?,status=?,total_amount=?,discount=?, sort_order=?, ip=? where id = ?",
      [
        name,
        description,
        code,
        tnc,
        end_date,
        start_date,
        uses_per_coupon,
        status,
        total_amount,
        discount,
        sort_order,
        ip,
        id,
      ]
    );
    res.json({
      status: true,
      message: "Coupons Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteCoupons = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await connection.query(
      "update coupons set status=-1 where id = ?",
      [id]
    );
    if (result[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: " Coupons deleted successfully",
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
  getAllCoupons,
  getByIdCoupons,
  updateByIdCoupons,
  createCoupons,
  deleteCoupons,
};
