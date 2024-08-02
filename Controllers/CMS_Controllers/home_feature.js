const connection = require("../../utils/db");

const getallWebHomeFeature = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT `id`, `home_feature_status`, `home_feature_cat`, `home_banner_status`, `home_banner`, `home_products_best`, `home_products_new`, `home_last_section_text`, `home_last_section_products` FROM `web_contents` WHERE 1"
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

const updateWebHomeFeature = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const {
      home_feature_status,
      home_feature_cat,
      home_banner_status,
      home_banner,
      home_products_best,
      home_products_new,
      home_last_section_text,
      home_last_section_products,
    } = req.body;

    const data = await connection.query(
      `UPDATE web_contents SET home_feature_status=?,home_feature_cat=?,home_banner_status=?, home_banner=? ,home_products_best=? ,home_products_new=? ,home_last_section_text=? , home_last_section_products=? WHERE id=?`,
      [
        home_feature_status,
        home_feature_cat,
        home_banner_status,
        home_banner,
        home_products_best,
        home_products_new,
        home_last_section_text,
        home_last_section_products,
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

const deletebyidfeature = async (req, res) => {
  try {
    const index = req.params;
    if (!index) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "UPDATE web_contents SET home_feature_cat = JSON_REMOVE(home_feature_cat, CONCAT('$[', ? , ']')) WHERE id = 1",
      [index]
    );

    if (data[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: "Deleted successfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Wrong ID",
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deletebyidbanner = async (req, res) => {
  try {
    const index = req.params;
    if (!index) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "UPDATE web_contents SET home_banner = JSON_REMOVE(home_banner, CONCAT('$[', ? , ']')) WHERE id = 1",
      [index]
    );

    if (data[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: "Deleted successfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Wrong ID",
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateFeature = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }
    console.log(id);
    const home_feature_cat = req.body;

    const data = await connection.query(
      `UPDATE web_contents SET home_feature_cat=? WHERE id=?`,
      [JSON.stringify(home_feature_cat), id]
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

const updateBanner = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }
    console.log(id);
    const home_banner = req.body;

    const data = await connection.query(
      `UPDATE web_contents SET home_banner=? WHERE id=?`,
      [JSON.stringify(home_banner), id]
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

module.exports = {
  getallWebHomeFeature,
  updateWebHomeFeature,
  deletebyidbanner,
  deletebyidfeature,
  updateFeature,
  updateBanner,
};
