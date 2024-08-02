const db = require("../../utils/db");
const clientIp = require("./clientIp");

const getAllManufacturer = async (req, res) => {
  try {
    const Manufacturer = await db.execute(
      "select * from manufacturers where status >= 0"
    );

    if (Manufacturer[0].length > 0) {
      res.status(200).json({
        status: true,
        data: Manufacturer[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getByIdManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const Manufacturer = await db.execute(
      "select * from manufacturers where (id =? and status>=0)",
      [id]
    );

    if (Manufacturer[0][0]?.id) {
      res.status(200).json({
        status: true,
        data: Manufacturer[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const createManufacturer = async (req, res) => {
  try {
    const { name, slug, description, sort_order, status } = req.body;
    const ip = clientIp.getIP(req);
    const inserted_by = "admin";

    const result = await db.execute(
      "insert into manufacturers (name,slug,description,sort_order,inserted_by,ip, status) values (?,?,?,?,?,?,?)",
      [name, slug, description, sort_order, inserted_by, ip, status]
    );
    res.status(200).json({
      status: true,
      message: "Manufacturer Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const { name, slug, description, sort_order, status } = req.body;
    const updated_by = "packsafe";
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);
    const result = await db.execute(
      "update manufacturers set name =? , slug=? , description=? , sort_order=? , updated_by=? ,updated_on=?, status=? where id = ?",
      [name, slug, description, sort_order, updated_by, updated_on, status, id]
    );
    res.json({ status: true, message: "Manufacturer Updated Successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteManufacturer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.execute(
      "update manufacturers set status=-1 where id = ?",
      [id]
    );
    if (result.affectedRows) {
      return res.status(204).json({
        status: true,
        message: " Manufacturer deleted successfully",
      });
    } else {
      return res.status(500).json({
        status: false,

        message: " Server Error ",
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
  getAllManufacturer,
  getByIdManufacturer,
  updateByIdManufacturer,
  createManufacturer,
  deleteManufacturer,
};
