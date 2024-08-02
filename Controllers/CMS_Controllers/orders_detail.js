const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getByIdOrdersDetail = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or Provide an id",
      });
    }

    const data = await connection.query(
      `select op.order_id as order_id, p.name as product_name, p.data_image as product_image ,op.quantity as quantity, op.price as price from ordered_products op join products p on op.product_id = p.id where order_id =${id} && status>=0`
    );
    if (!data[0].length) {
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

module.exports = {
  getByIdOrdersDetail,
};
