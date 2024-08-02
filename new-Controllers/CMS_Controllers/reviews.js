const db = require("../../utils/db");
const clientIp = require("../../utils/clientIp");

const getAllReviews = async (req, res) => {
  try {
    const Reviews = await db.execute("select * from reviews");

    if (Reviews[0].length > 0) {
      res.status(200).json({
        status: true,
        data: Reviews[0],
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

const getByIdReviews = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const Reviews = await db.execute("select * from reviews where (id =? )", [
      id,
    ]);

    if (Reviews[0][0]?.id) {
      res.status(200).json({
        status: true,
        data: Reviews[0],
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

const createReviews = async (req, res) => {
  try {
    const { name, slug, description, sort_order, inserted_by } = req.body;
    const ip = clientIp.getIP(req);
    const result = await db.execute(
      "insert into reviews (name,description,sort_order,inserted_by,status,ip) values (?,?,?,?,?,?)",
      [name, description, sort_order, inserted_by, 1, ip]
    );
    res.status(200).json({
      status: true,
      message: "Reviews Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdReviews = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const { title, review } = req.body;
    const result = await db.execute(
      "update reviews set title =? , review=?  where id = ?",
      [title, review, id]
    );
    res.json({ status: true, message: "Reviews Updated Successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteReviews = async (req, res) => {
  try {
    const { id } = req.params;

    //update status reviews to -2 so it stays in database for analytics
    const result = await db.execute(
      "update reviews set status=-2 where id = ?",
      [id]
    );
    if (result[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: " Reviews deleted successfully",
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
  getAllReviews,
  getByIdReviews,
  updateByIdReviews,
  createReviews,
  deleteReviews,
};
