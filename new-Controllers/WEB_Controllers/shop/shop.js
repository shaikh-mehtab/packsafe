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
    const { page, s_cats,s_brands } = req.body;
    const page_no = page || 1;
    var user = req.session.user || {};
    const { globalContent, store_setting, main_menu } = await fetchShopPage();
    const {products,totalProducts,categories,brands} = await fetchProducts(page_no,s_cats,s_brands)
    // const { products, totalProducts } = await fetchProducts(page_no, category);
    const cat = await fetchCategory();
    const manf = await fetchManf();
    const cart = await fetchCartData(req);
    console.log(products,totalProducts,categories,brands);
    // res.render("shop", {
    //   globalContent,
    //   products,
    //   categories,brands,
    //   cart,
    //   store_setting,
    //   user,
    //   totalProducts,
    //   main_menu,
    //   page_no,
    //   category,
    //   manf,
    //   cat,
      
    // });
        res.json( {
      products,
      categories,brands,
      totalProducts,
      manf,
      cat,
      
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};
