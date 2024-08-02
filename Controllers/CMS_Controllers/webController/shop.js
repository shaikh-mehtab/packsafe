const connection = require("../../../utils/db.js");

const getallWebShop = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT `id`,`shop_title`, `shop_meta_title`, `shop_meta_desc`, `shop_breadcrumb_name`, `shop_cover` FROM `web_contents` WHERE 1"
    );
    if (!data || data.length === 0 || !data[0].length) {
      return res.status(400).send({
        status: false,
        message: "No records founds",
      });
    }
    res.status(200).send({
      status: true,
      message: "All data found",
      totalData: data[0].length,
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

const updateByIdWebShop = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const {
      shop_title,
      shop_meta_title,
      shop_meta_desc,
      shop_breadcrumb_name,
      shop_cover,
    } = req.body;

    const data = await connection.query(
      `UPDATE web_contents SET shop_title=?,shop_meta_title=?,shop_meta_desc=?,shop_breadcrumb_name=?,shop_cover=? WHERE id=?`,
      [
        shop_title,
        shop_meta_title,
        shop_meta_desc,
        shop_breadcrumb_name,
        shop_cover,
        id,
      ]
    );
    if (data[0] && data[0].changedRows > 0) {
      return res.status(200).send({
        status: true,
        message: "Successfully Updated data",
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
  getallWebShop,
  updateByIdWebShop,
};
