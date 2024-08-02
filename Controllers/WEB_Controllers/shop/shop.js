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
    const { page, categories, brands } = req.query;
    console.log(categories);
    const page_no = page || 1;

    const selectedCategories = req.query.categories || "";
    const selectedBrands = req.query.brands || ""

    const categoryArray = categories
      ? categories.split(",").filter(Boolean)
      : [];
    const brandArray = brands ? brands.split(",").filter(Boolean) : [];


    var user = req.session.user || {};
    const { globalContent, store_setting, main_menu } = await fetchShopPage();
    const {
      products,
      totalProducts,
      categories: catList,
      brands: brandList,
    } = await fetchProducts(page_no, categoryArray, brandArray);
    const cat = await fetchCategory();
    const manf = await fetchManf();
    const cart = await fetchCartData(req);

    res.render("shop", {
      globalContent,
      products,
      categories: catList,
      brands: brandList,
      cart,
      store_setting,
      user,
      totalProducts,
      main_menu,
      page_no,
      category: categories,
      Pagecategories: selectedCategories,
      Pagebrands: selectedBrands,
      manf,
      cat,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};
