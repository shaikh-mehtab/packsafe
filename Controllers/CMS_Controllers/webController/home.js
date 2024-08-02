const connection = require("../../../utils/db.js");

const getallWebHome = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT `id`, `home_title`, `home_meta_title`, `home_meta_desc`, `home_slider` FROM `web_contents` WHERE 1"
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

const updateWebHome = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const { home_title, home_meta_title, home_meta_desc, home_slider } =
      req.body;

    const data = await connection.query(
      `UPDATE web_contents SET home_title=?, home_meta_title=?, home_meta_desc=?, home_slider=? WHERE id=?`,
      [home_title, home_meta_title, home_meta_desc, home_slider, id]
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

const updateSlider = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }
    console.log(id);
    const home_slider = req.body;

    const data = await connection.query(
      `UPDATE web_contents SET home_slider=? WHERE id=?`,
      [JSON.stringify(home_slider), id]
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

const deletebyidSlider = async (req, res) => {
  try {
    const index = req.params;
    if (!index) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "UPDATE web_contents SET home_slider = JSON_REMOVE(home_slider, CONCAT('$[', ? , ']')) WHERE id = 1",
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

module.exports = {
  getallWebHome,
  updateWebHome,
  updateSlider,
  deletebyidSlider,
};
