const connection = require("../../../utils/db.js");

const getallWebAbout = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT `id`, `about_title`, `about_meta_title`, `about_meta_desc`, `about_breadcrumb_name`, `about_cover`, `about_text`, `about_group_data`, `about_long_desc` FROM `web_contents` WHERE 1"
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

const updateWebAbout = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const {
      about_title,
      about_meta_title,
      about_meta_desc,
      about_breadcrumb_name,
      about_cover,
      about_text,
      about_group_data,
      about_long_desc,
    } = req.body;

    const data = await connection.query(
      `UPDATE web_contents SET about_title=?, about_meta_title=?, about_meta_desc=?, about_breadcrumb_name=?, about_cover=?, about_text=? , about_group_data=?, about_long_desc=? WHERE id=?`,
      [
        about_title,
        about_meta_title,
        about_meta_desc,
        about_breadcrumb_name,
        about_cover,
        about_text,
        about_group_data,
        about_long_desc,
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
  getallWebAbout,
  updateWebAbout,
};