const connection = require("../../utils/db");

const getallWebEstore = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT `id`, `store_title`, `store_meta_title`, `store_meta_desc`, `store_text`, `store_breadcrumb`, `store_cover`, `store_data` FROM `web_contents` WHERE 1"
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

const updateByIdWebEstore = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const {
      store_title,
      store_meta_title,
      store_meta_desc,
      store_text,
      store_breadcrumb,
      store_cover,
      store_data,
    } = req.body;

    const data = await connection.query(
      `UPDATE web_contents SET store_title=?, store_meta_title=?,store_meta_desc=?, store_text=?, store_breadcrumb=?,store_cover=?, store_data=? WHERE id=?`,
      [
        store_title,
        store_meta_title,
        store_meta_desc,
        store_text,
        store_breadcrumb,
        store_cover,
        store_data,
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

const updateStoreData = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }
    console.log(id);
    const store_data = req.body;

    const data = await connection.query(
      `UPDATE web_contents SET store_data=? WHERE id=?`,
      [JSON.stringify(store_data), id]
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

const deletebyidStoreData = async (req, res) => {
  try {
    const index = req.params;
    if (!index) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "UPDATE web_contents SET store_data = JSON_REMOVE(store_data, CONCAT('$[', ? , ']')) WHERE id = 1",
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
  getallWebEstore,
  updateByIdWebEstore,
  updateStoreData,
  deletebyidStoreData,
};
