const { fetchCheckoutData, fetchCartData } = require("../utils/dbUtils");

exports.checkoutController = async (req, res) => {
  try {
    const cart = await fetchCartData(req);
    var user = req.session.user || {};
    const { globalContent, store_setting, main_menu, savedAddress } =
      await fetchCheckoutData(req);
    res.render("checkout", {
      globalContent,
      main_menu,
      store_setting,
      savedAddress,
      cart,
      user,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};
