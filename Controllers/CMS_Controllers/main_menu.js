const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getAllMainMenu = async (req, res) => {
  try {
    const MainMenu = await connection.execute(
      "select * from main_menu where status >= 0"
    );

    if (MainMenu[0].length > 0) {
      res.status(200).json({
        status: true,
        data: MainMenu[0],
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

const getByIdMainMenu = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const MainMenu = await connection.query(
      "select * from main_menu where (id =? and status>=0)",
      [id]
    );

    if (MainMenu[0][0]?.id) {
      res.status(200).json({
        status: true,
        MainMenu: MainMenu[0],
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

const createMainMenu = async (req, res) => {
  try {
    const {
      name,
      short_desc,
      menu_options,
      menu_type,
      direct_link,
      status,
      sort_order,
    } = req.body;
    const ip = clientIp.getIP(req);
    const inserted_by = "admin";
    const updated_by = "packsafe";
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);

    const result = await connection.query(
      "insert into main_menu (name, short_desc,menu_options,menu_type,direct_link,status,sort_order,inserted_by, updated_by, updated_on, ip) values(?,?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        short_desc,
        menu_options,
        menu_type,
        direct_link,
        status,
        sort_order,
        inserted_by,
        updated_by,
        updated_on,
        ip,
      ]
    );
    res.status(200).json({
      data: result,
      status: true,
      message: "Main Menu Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdMainMenu = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Wrong Id",
      });
    }
    const {
      name,
      short_desc,
      menu_options,
      menu_type,
      direct_link,
      status,
      sort_order,
    } = req.body;
    const ip = clientIp.getIP(req);

    const inserted_by = "admin";
    const updated_by = "packsafe";
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);

    const result = await connection.query(
      "update main_menu set name =?, short_desc=?, menu_options=?,menu_type=?, direct_link=?, status=?, sort_order=?, inserted_by=?,updated_by=?, updated_on=?, ip=? where id = ?",
      [
        name,
        short_desc,
        menu_options,
        menu_type,
        direct_link,
        status,
        sort_order,
        inserted_by,
        updated_by,
        updated_on,
        ip,
        id,
      ]
    );
    res.json({
      status: true,
      message: "Main Menu Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteMainMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await connection.query(
      "update main_menu set status=-1 where id = ?",
      [id]
    );
    if (result[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: " Coupons deleted successfully",
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
  getAllMainMenu,
  getByIdMainMenu,
  updateByIdMainMenu,
  createMainMenu,
  deleteMainMenu,
};
