const { fetchCartData, fetchStoreContent } = require("../utils/dbUtils");

exports.eStoreControllers = async (req, res, next) => {
  try {
    const cart = await fetchCartData(req);
    var user = req.session.user || {};
    const { main_menu, store_setting, globalContent } =
      await fetchStoreContent();
    res.render("estore", {
      user,
      cart,
      store_setting,
      main_menu,
      globalContent,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};
