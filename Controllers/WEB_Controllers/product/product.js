const db = require("../../../utils/db");
const { fetchProductPage, fetchCartData } = require("../utils/dbUtils");

exports.productControllers = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const {
      globalContent,
      data,
      store_setting,
      category,
      manufacturer,
      relatedProducts,
      main_menu,
      reviews,
    } = await fetchProductPage(slug);
    const cart = await fetchCartData(req);
    var user = req.session.user || {};
    res.render("product", {
      globalContent,
      main_menu,
      data,
      store_setting,
      user,
      cart,
      category,
      reviews,
      manufacturer,
      relatedProducts,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { product_id, comment, rating, user_id } = req.body;
    if (!product_id || !comment || !rating || !user_id) {
      throw new Error("Invalid data");
    }
    const data = await db.query(
      "insert into reviews (product_id, comment, rating, user_id) values (?,?,?,?)",
      [product_id, comment, rating, user_id]
    );
    const [comments] = await db.query(
      "select *,users.id as user_id,reviews.id as id from reviews join users on users.id = reviews.user_id where reviews.product_id=? ",
      [Number(product_id)]
    );
    res.json({ status: true, data: comments, user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, status: "false" });
  }
};

exports.removeComment = async (req, res, next) => {
  try {
    const { product_id, comment_id, user_id } = req.body;
    if (!comment_id || !user_id) {
      throw new Error("Invalid data");
    }
    const data = await db.query("delete from reviews where id = ?", [
      comment_id,
    ]);
    const [comments] = await db.query(
      "select *,users.id as user_id,reviews.id as id from reviews join users on users.id = reviews.user_id where reviews.product_id=? ",
      [Number(product_id)]
    );
    res.json({ status: true, data: comments, user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, status: "false" });
  }
};
