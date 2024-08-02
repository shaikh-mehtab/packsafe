const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getallFilter = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from filters where status>=0"
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

const getByIdFilter = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or Provide an id",
      });
    }

    const data = await connection.query(
      `select * from filters where id=${id} && status>=0`
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

const createFilter = async (req, res) => {
  try {
    const { name, slug, filter_type, sort_order, status } = req.body;

    const ip = clientIp.getIP(req);
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);
    const inserted_by = "packsafe";
    const updated_by = "packsafe";

    const data = await connection.query(
      "INSERT into filters( name, slug, filter_type, sort_order, status, inserted_by, updated_by, updated_on,ip) VALUES(?,?,?,?,?,?,?,?,?)",
      [
        name,
        slug,
        filter_type,
        sort_order,
        status,
        inserted_by,
        updated_by,
        updated_on,
        ip,
      ]
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

const updateByIdFilter = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);
    const updated_by = "packsafe";
    const inserted_by = "packsafe";

    const ip = clientIp.getIP(req);
    const { name, slug, filter_type, sort_order, status } = req.body;

    const data = await connection.query(
      `UPDATE filters SET name=?, slug=?, filter_type=?, sort_order=?, status=?, inserted_by=?, updated_by=?, updated_on=?,ip=? WHERE id=${id}`,
      [
        name,
        slug,
        filter_type,
        sort_order,
        status,
        inserted_by,
        updated_by,
        updated_on,
        ip,
      ]
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

const deleteByIdFilter = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or provide an Id",
      });
    }

    const data = await connection.query(
      `UPDATE filters SET status=-1 WHERE id=${id}`,
      [id]
    );

    if (data[0].affectedRows) {
      return res.status(200).send({
        status: true,
        message: "Deleted successfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).send({
        status: false,
        message: "Something Went Wrong",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Failed to delete",
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
  getallFilter,
  getByIdFilter,
  updateByIdFilter,
  createFilter,
  deleteByIdFilter,
};
