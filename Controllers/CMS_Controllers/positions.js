const db = require("../../utils/db");
const clientIp = require("./clientIp");

const getAllPositions = async (req, res) => {
  try {
    const Positions = await db.execute(
      "select * from career where status >= 0"
    );

    if (Positions[0].length > 0) {
      res.status(200).json({
        status: true,
        data: Positions[0],
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

const getByIdPositions = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const Positions = await db.execute(
      "select * from career where (job_id =? and status>=0)",
      [id]
    );

    if (Positions[0][0]?.job_id) {
      res.status(200).json({
        status: true,
        data: Positions[0],
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

const createPositions = async (req, res) => {
  try {
    const {
      position,
      description,
      location,
      requirement,
      sort_order,
      inserted_by,
    } = req.body;
    const ip = await clientIp.getIP(req);

    const result = await db.execute(
      "insert into career (position,description,location,requirement,sort_order,inserted_by,status,ip) values (?,?,?,?,?,?,?,?)",
      [
        position,
        description,
        location,
        requirement,
        sort_order,
        inserted_by,
        1,
        ip,
      ]
    );
    res.status(200).json({
      status: true,
      message: "Position Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdPositions = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const {
      position,
      description,
      location,
      requirement,
      sort_order,
      updated_by,
      status,
    } = req.body;
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);
    const result = await db.execute(
      "update career set position =? , description=? , location=? , requirement=? , sort_order=?,updated_by=?,updated_on=?, status=? where job_id = ?",
      [
        position,
        description,
        location,
        requirement,
        sort_order,
        updated_by,
        updated_on,
        status,
        id,
      ]
    );
    res.json({ status: true, message: "Positions Updated Successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deletePositions = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.execute(
      "update career set status=-1 where job_id = ?",
      [id]
    );
    if (result[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: " Positions deleted successfully",
      });
    } else {
      return res.status(500).json({
        status: false,
        res: result,
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
  getAllPositions,
  getByIdPositions,
  updateByIdPositions,
  createPositions,
  deletePositions,
};
