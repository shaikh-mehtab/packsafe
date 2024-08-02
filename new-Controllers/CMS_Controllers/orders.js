const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getallOrders = async (req, res) => {
  try {
    const [data] = await connection.query(
      "SELECT * FROM orders WHERE status >= 0"
    );
    if (!data || data.length === 0) {
      return res.status(400).send({
        status: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      status: true,
      message: "All data found",
      totaldata: data.length,
      data: data,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getByIdOrdersStatus = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        status: false,
        message: "Invalid or missing ID",
      });
    }

    const [data] = await connection.query(
      `SELECT o.*, GROUP_CONCAT(p.name) AS product_names, GROUP_CONCAT(op.price) AS product_price, JSON_ARRAYAGG(p.data_image) AS product_image
       FROM orders o
       JOIN ordered_products op ON o.id = op.order_id
       JOIN products p ON op.product_id = p.id
       WHERE o.status = ? AND o.status >= 0
       GROUP BY o.id`,
      [id]
    );
    if (!data[0] || !data[0].id) {
      return res.status(400).send({
        status: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      status: true,
      message: "Single data found",
      totaldata: data.length,
      data: data,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getByIdOrders = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        status: false,
        message: "Invalid or missing ID",
      });
    }

    const [data] = await connection.query(
      "SELECT * FROM orders WHERE id = ? AND status >= 0",
      [id]
    );
    if (!data[0] || !data[0].id) {
      return res.status(400).send({
        status: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      status: true,
      message: "Single data found",
      totaldata: data.length,
      data: data,
    });
  } catch (error) {
    console.error(error.message);
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
      return res.status(400).send({
        status: false,
        message: "Invalid or missing ID",
      });
    }

    const ip = clientIp.getIP(req);
    const { status } = req.body;

    const [data] = await connection.query(
      "UPDATE orders SET status = ?, ip = ? WHERE id = ?",
      [status, ip, id]
    );

    if (data.changedRows) {
      return res.status(200).send({
        status: true,
        message: "Successfully updated data",
      });
    } else if (data.affectedRows === 0) {
      return res.status(404).send({
        status: false,
        message: "Order not found",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    console.error(error.message);
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
};
