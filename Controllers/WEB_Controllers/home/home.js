const {
  fetchHomeData,
  fetchHomeProducts,
  fetchCartData,
} = require("../utils/dbUtils");

exports.homeControllers = async (req, res, next) => {
  try {
    const {
      globalContent,
      main_menu,
      new_arrivals,
      store_setting,
      brands,
      best_sellers,
      last_products,
    } = await fetchHomeData();
    const cart = await fetchCartData(req);
    var user = req.session.user || {};
    res.render("home", {
      globalContent,
      last_products,
      main_menu,
      store_setting,
      brands,
      cart,
      user,
      new_arrivals,
      best_sellers,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};
