const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getallInfoPage = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from info_page where status>=0"
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

const getByIdInfoPage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or Provide an id",
      });
    }

    const data = await connection.query(
      `select * from info_page where id=${id} && status>=0`
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

const createInfoPage = async (req, res) => {
  try {
    const {
      name,
      slug,
      title,
      long_desc,
      meta_desc,
      meta_title,
      sort_order,
      status,
    } = req.body;

    const inserted_by = "packsafe";
    const ip = clientIp.getIP(req);

    const data = await connection.query(
      "INSERT into info_page(name, slug, title, long_desc, meta_desc, meta_title, sort_order, status, inserted_by, ip) VALUES(?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        slug,
        title,
        long_desc,
        meta_desc,
        meta_title,
        sort_order,
        status,
        inserted_by,
        ip,
      ]
    );
    res.status(200).send({
      status: true,
      data: data[0],
    });
  } catch {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdInfoPage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }
    const {
      name,
      slug,
      title,
      long_desc,
      meta_title,
      meta_desc,
      sort_order,
      status,
    } = req.body;

    const inserted_by = "admin";

    const data = await connection.query(
      `UPDATE info_page SET  name=?,slug=?,title=?,long_desc=?,meta_desc=?,meta_title=?,sort_order=?,status=?,inserted_by=? WHERE id=${id}`,
      [
        name,
        slug,
        title,
        long_desc,
        meta_desc,
        meta_title,
        sort_order,
        status,
        inserted_by,
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

const deleteByIdInfoPage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or provide an Id",
      });
    }

    const data = await connection.query(
      `UPDATE info_page SET status=-1 WHERE id=${id}`,
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
  getallInfoPage,
  getByIdInfoPage,
  updateByIdInfoPage,
  createInfoPage,
  deleteByIdInfoPage,
};
