const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getallOrders = async (req, res) => {
  try {
    const data = await connection.query("select * from orders where status>=0");
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

// const getByIdOrdersStatus = async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!id) {
//       res.status(404).send({
//         status: false,
//         message: "Invalid or Provide an id",
//       });
//       return;
//     }

//     const data = await connection.query(
//       `SELECT o.*, GROUP_CONCAT(p.name) AS product_names, GROUP_CONCAT(op.price) AS product_price, JSON_ARRAYAGG(p.data_image) AS product_image FROM orders o JOIN ordered_products op ON o.id = op.order_id JOIN products p ON op.product_id = p.id WHERE o.status = ? AND o.status >= 0 GROUP BY o.id`,
//       [id]
//     );
//     if (!data[0][0]?.id) {
//       res.status(400).send({
//         status: false,
//         message: "No records found",
//       });
//     }
//     res.status(200).send({
//       status: true,
//       message: "Single data found",
//       totaldata: data[0].length,
//       data: data[0],
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({
//       status: false,
//       message: error.message,
//     });
//   }
// };

const getByIdOrdersStatus = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if ID is valid
    if (!id || isNaN(id)) {
      return res.status(400).send({
        status: false,
        message: "Invalid or missing id",
      });
    }

    const data = await connection.query(
      `SELECT  o.*,JSON_ARRAYAGG(JSON_OBJECT('name',p.name ,'image', p.data_image,'price', op.price, 'qty', op.quantity)) AS products, GROUP_CONCAT(op.price) AS product_price FROM orders o JOIN ordered_products op ON o.id = op.order_id JOIN products p ON op.product_id = p.id WHERE o.status = ? AND o.status >= 0 GROUP BY o.id`,
      [id]
    );

    if (data[0].length === 0) {
      return res.status(404).send({
        status: false,
        message: "No records found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Single data found",
      totaldata: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const getByIdOrders = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or Provide an id",
      });
      return;
    }

    const data = await connection.query(
      `select * from orders where id=${id} && status>=0`
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

const updateByIdOrdersStatus = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const ip = clientIp.getIP(req);
    const { status, vendor_id, tracking_url } = req.body;

    const data = await connection.query(
      `UPDATE orders SET status=?,vendor_id=?, tracking_url=?, ip=? WHERE id=?`,
      [status, vendor_id, tracking_url, ip, id]
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

const updateByIdOrdersVendor = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const { vendor_id, tracking_url } = req.body;

    const data = await connection.query(
      `UPDATE orders SET vendor_id=?, tracking_url=? WHERE id= ?`,
      [vendor_id, tracking_url, id]
    );

    if (data[0].changedRows) {
      return res.status(200).send({
        status: true,
        message: "Successfully Updated Vendor data",
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

module.exports = {
  getallOrders,
  getByIdOrdersStatus,
  getByIdOrders,
  updateByIdOrdersStatus,
  updateByIdOrdersVendor,
};
