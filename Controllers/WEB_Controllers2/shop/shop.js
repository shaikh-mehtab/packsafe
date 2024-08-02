const {
  fetchProducts,
  fetchShopPage,
  fetchCategory,
  fetchSubCategory,
  fetchManf,
  fetchCartData,
} = require("../utils/dbUtils");

exports.shopControllers = async (req, res, next) => {
  try {
    const { page, category } = req.query;
    const page_no = page || 1;
    var user = req.session.user || {};
    const { globalContent, store_setting, main_menu } = await fetchShopPage();
    const { products, totalProducts } = await fetchProducts(page_no, category);
    const cat = await fetchCategory();
    const subCat = await fetchSubCategory(category);
    const manf = await fetchManf(category);
    const cart = await fetchCartData(req);
    res.render("shop", {
      globalContent,
      products,
      cart,
      store_setting,
      user,
      totalProducts,
      main_menu,
      page_no,
      category,
      manf,
      cat,
      subCat,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};
