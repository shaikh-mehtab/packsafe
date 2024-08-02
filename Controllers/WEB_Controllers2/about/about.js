const {
  fetchAboutPage,
  fetchAboutContent,
  fetchCartData,
} = require("../utils/dbUtils");

exports.aboutControllers = async (req, res, next) => {
  const { globalContent, store_setting, data, main_menu, brands } =
    await fetchAboutContent();
  const cart = await fetchCartData(req);
  var user = req.session.user || {};
  console.log("req,", req.params);
  res.render("about", {
    globalContent,
    data,
    store_setting,
    brands,
    main_menu,
    user,
    cart,
  });
};
