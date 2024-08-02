const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getAllVendor = async (req, res) => {
  try {
    const Vendor = await connection.query(
      "select * from vendor where status >= 0"
    );

    if (Vendor[0].length > 0) {
      res.status(200).json({
        status: true,
        Vendor: Vendor[0],
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

module.exports = {
  getAllVendor,
};
