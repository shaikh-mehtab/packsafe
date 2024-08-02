const db = require("../../utils/db");

const getAllSettings = async (req, res) => {
  try {
    const Setting = await db.execute(
      "select * from setting where mailer_status >= 0"
    );

    if (Setting[0].length > 0) {
      res.status(200).json({
        status: true,
        data: Setting[0],
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

const updateByIdSettings = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const {
      email,
      mailer_notify_email,
      mailer_email,
      mailer_password,
      mailer_host,
      mailer_port,
      mailer_secure,
      mailer_status,
      name,
      career_email,
      meta_title,
      meta_description,
      razorpay_id,
      razorpay_secret_key,
      logo,
    } = req.body;

    const result = await db.execute(
      "update setting set mailer_notify_email=?, mailer_email=?,mailer_password=?,mailer_host=?,mailer_port=?, mailer_secure=?,mailer_status=?,name=?,career_email=?, meta_title=?, meta_description=?, razorpay_id=?, razorpay_secret_key=?, logo=? where id = ?",
      [
        mailer_notify_email,
        mailer_email,
        mailer_password,
        mailer_host,
        mailer_port,
        mailer_secure,
        mailer_status,
        name,
        career_email,
        meta_title,
        meta_description,
        razorpay_id,
        razorpay_secret_key,
        logo,
        id,
      ]
    );
    res
      .status(200)
      .json({ status: true, message: "Settings Data Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllSettings,
  updateByIdSettings,
};
