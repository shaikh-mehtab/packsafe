const db = require("../../utils/db");
const clientIp = require("./clientIp");

const getAllApplicants = async (req, res) => {
  try {
    const Applicants = await db.execute(
      "select * from job_apply where status >= 0"
    );

    if (Applicants[0].length > 0) {
      res.status(200).json({
        status: true,
        data: Applicants[0],
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

const getByIdApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const Applicants = await db.execute(
      "select j.id,j.name,j.phone,j.email_id,j.resume,j.inserted_by,j.inserted_on,j.status,c.job_id,c.position,c.location from job_apply as j join career as c on j.job_id = c.job_id where j.id=? and j.status>=0",
      [id]
    );

    if (Applicants[0][0]?.id) {
      res.status(200).json({
        status: true,
        data: Applicants[0],
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

const createApplicants = async (req, res) => {
  try {
    const { name, phone, email_id, resume, job_id, inserted_by } = req.body;
    const ip = await clientIp.getIP(req);

    const result = await db.execute(
      "insert into job_apply (name,phone,email_id,resume,job_id,inserted_by,status,ip) values (?,?,?,?,?,?,?,?)",
      [name, phone, email_id, resume, job_id, inserted_by, 1, ip]
    );
    res.status(200).json({
      status: true,
      message: "Applicant Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const { name, phone, email_id, resume, updated_by, status } = req.body;
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);
    const result = await db.execute(
      "update job_apply set name =? , phone=? , email_id=? , resume=? , updated_by=? ,updated_on=?, status=? where id = ?",
      [name, phone, email_id, resume, updated_by, updated_on, status, id]
    );
    res.json({ status: true, message: "Applicants Updated Successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteApplicants = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.execute(
      "update job_apply set status=-1 where id = ?",
      [id]
    );
    if (result.affectedRows) {
      return res.status(204).json({
        status: true,
        message: " Applicants deleted successfully",
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
  getAllApplicants,
  getByIdApplicants,
  updateByIdApplicants,
  createApplicants,
  deleteApplicants,
};
