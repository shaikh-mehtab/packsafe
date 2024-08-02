const db = require("../../../utils/db");

// exports.fetchHomeData = async () => {
//   try {
//     const [globalContent] = await db.execute(
//       `SELECT home_title as page_title,home_meta_title as page_meta_title, home_meta_desc as page_meta_title, home_slider,home_feature_status,home_feature_cat, home_banner_status,home_banner,home_products_best,home_products_new,home_last_section_text,home_last_section_products FROM web_contents WHERE id=1 ;`
//     );
//     // var last_products = [];
//     // JSON.parse(globalContent[0].home_last_section_products).forEach(
//     //   async (prodId) => {
//     //     const [data] = await db.execute("select * from products where id=?", [
//     //       prodId,
//     //     ]);
//     //     const [active_offer] = await db.query(
//     //       "select * from splprices where p_id = ? and from_date <=CURRENT_DATE and to_date >=CURRENT_DATE and status >=0",
//     //       [data[0].id]
//     //     );
//     //     if (active_offer[0]) {
//     //       data[0].spl_price = data[0].price - active_offer[0].amount;
//     //     } else {
//     //       data[0].spl_price = data[0].price;
//     //     }
//     //     console.log(data[0]);
//     //     last_products.push(data[0]);
//     //   }
//     // );

//     var last_products = [];
//     // async function fetchProducts() {
//     //   const products = JSON.parse(globalContent[0].home_last_section_products);
//     //   for (const prodId of products) {
//     //     const [data] = await db.execute("select * from products where id=?", [
//     //       prodId,
//     //     ]);
//     //     const [active_offer] = await db.query(
//     //       "select * from splprices where p_id = ? and from_date <= CURRENT_DATE and to_date >= CURRENT_DATE and status >= 0",
//     //       [data[0].id]
//     //     );
//     //     if (active_offer[0]) {
//     //       data[0].spl_price = data[0].price - active_offer[0].amount;
//     //     } else {
//     //       data[0].spl_price = data[0].price;
//     //     }
//     //     console.log(data[0], "line 44");
//     //     last_products.push(data[0]);
//     //   }
//     // }

//     var best_sellers = [];
//     JSON.parse(globalContent[0].home_products_best).for(const prodId of  => {
//       const [data] = await db.execute("select * from products where id=?", [
//         prodId,
//       ]);
//       const [active_offer] = await db.execute(
//         "select * from splprices where p_id = ? and from_date <=CURRENT_DATE and to_date >=CURRENT_DATE and status >=0",
//         [data[0].id]
//       );
//       if (active_offer[0]) {
//         data[0].spl_price = data[0].price - active_offer[0].amount;
//       } else {
//         data[0].spl_price = data[0].price;
//       }
//       best_sellers.push(data[0]);
//     });
//     var new_arrivals = [];
//     JSON.parse(globalContent[0].home_products_new).forEach(async (prodId) => {
//       const [data] = await db.execute("select * from products where id=?", [
//         prodId,
//       ]);
//       const [active_offer] = await db.execute(
//         "select * from splprices where p_id = ? and from_date <=CURRENT_DATE and to_date >=CURRENT_DATE and status >=0",
//         [data[0].id]
//       );
//       if (active_offer[0]) {
//         data[0].spl_price = data[0].price - active_offer[0].amount;
//       } else {
//         data[0].spl_price = data[0].price;
//       }
//       new_arrivals.push(data[0]);
//     });
//     const main_menu = await this.fetch_main_menu();
//     return {
//       globalContent: globalContent[0],
//       main_menu: main_menu,
//       new_arrivals: new_arrivals,
//       last_products: last_products,
//       best_sellers: best_sellers,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.fetchHomeData = async () => {
  try {
    const [globalContent] = await db.execute(
      `SELECT home_title as page_title,home_meta_title as page_meta_title, home_meta_desc as page_meta_title, home_slider,home_feature_status,home_feature_cat, home_banner_status,home_banner,home_products_best,home_products_new,home_last_section_text,home_last_section_products FROM web_contents WHERE id=1 ;`
    );
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    let last_products = [];
    let best_sellers = [];
    let new_arrivals = [];

    // Fetch products for last section
    const fetchLastSectionProducts = async () => {
      const products = JSON.parse(globalContent[0].home_last_section_products);
      for (const prodId of products) {
        const [data] = await db.execute("select * from products where id=?", [
          prodId,
        ]);
        const [active_offer] = await db.query(
          "select * from splprices where p_id = ? and from_date <= CURRENT_DATE and to_date >= CURRENT_DATE and status >= 0",
          [data[0].id]
        );
        if (active_offer.length > 0) {
          data[0].spl_price = data[0].price - active_offer[0].amount;
        } else {
          data[0].spl_price = data[0].price;
        }
        last_products.push(data[0]);
      }
    };

    // Fetch best sellers products
    const fetchBestSellers = async () => {
      const products = JSON.parse(globalContent[0].home_products_best);
      for (const prodId of products) {
        const [data] = await db.execute("select * from products where id=?", [
          prodId,
        ]);
        const [active_offer] = await db.query(
          "select * from splprices where p_id = ? and from_date <= CURRENT_DATE and to_date >= CURRENT_DATE and status >= 0",
          [data[0].id]
        );
        if (active_offer.length > 0) {
          data[0].spl_price = data[0].price - active_offer[0].amount;
        } else {
          data[0].spl_price = data[0].price;
        }
        best_sellers.push(data[0]);
      }
    };

    // Fetch new arrivals products
    const fetchNewArrivals = async () => {
      const products = JSON.parse(globalContent[0].home_products_new);
      for (const prodId of products) {
        const [data] = await db.execute("select * from products where id=?", [
          prodId,
        ]);
        const [active_offer] = await db.query(
          "select * from splprices where p_id = ? and from_date <= CURRENT_DATE and to_date >= CURRENT_DATE and status >= 0",
          [data[0].id]
        );
        if (active_offer.length > 0) {
          data[0].spl_price = data[0].price - active_offer[0].amount;
        } else {
          data[0].spl_price = data[0].price;
        }
        new_arrivals.push(data[0]);
      }
    };

    // Execute all fetch functions
    await Promise.all([
      fetchLastSectionProducts(),
      fetchBestSellers(),
      fetchNewArrivals(),
    ]);

    const [brands] = await db.execute("select name from manufacturers");

    const main_menu = await this.fetch_main_menu();

    return {
      globalContent: globalContent[0],
      main_menu: main_menu,
      new_arrivals: new_arrivals,
      brands,
      store_setting: store_setting[0],
      last_products: last_products,
      best_sellers: best_sellers,
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
  }
};

exports.fetchHomeProducts = async () => {
  try {
    const homeProducts = await db.execute(
      `SELECT p.id,p.name,p.data_image,p.short_desc,p.price,hp.name as display_category
      FROM products p
      JOIN home_products hp ON FIND_IN_SET(p.id, hp.p_ids) > 0 where p.status>=0;
      `
    );

    return homeProducts[0];
  } catch (error) {
    console.error(error);
  }
};

exports.fetchShopPage = async () => {
  try {
    const shopContent = await db.execute(
      `SELECT shop_title as page_title, shop_meta_title as page_meta_title, shop_meta_desc as page_meta_desc,shop_cover as page_cover,shop_breadcrumb_name as breadcrumb_name FROM web_contents ;`
    );
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    const main_menu = await this.fetch_main_menu();
    return {
      globalContent: shopContent[0][0],
      main_menu: main_menu,
      store_setting: store_setting[0],
    };
  } catch (error) {
    console.error(error);
  }
};

exports.fetchAboutPage = async () => {
  try {
    const aboutContent = await db.execute(
      `SELECT about_title as page_title,about_name,about_short_desc,about_long_desc, about_meta_title as page_meta_title, about_meta_desc as page_meta_title,about_page_img as page_cover FROM web_content WHERE id=1 ;`
    );
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    return {
      aboutContent: aboutContent[0][0],
      store_setting: store_setting[0],
    };
  } catch (error) {
    console.error(error);
  }
};

exports.fetchProducts = async (page_no, categories,brands) => {
  try {
    const page = page_no || 1;
    const limit = 12;
    const offset = (page - 1) * 12;
    console.log(page,limit,offset);

    let sql = `SELECT p.*, COALESCE(s.name, '') AS special_name, COALESCE(s.amount, 0) AS discount_amount, 
          CASE
              WHEN s.amount IS NULL THEN p.price
              ELSE p.price - s.amount
          END AS spl_price
      FROM 
          products p 
      LEFT JOIN 
          splprices s ON s.p_id = p.id 
              AND s.from_date <= CURRENT_DATE 
              AND s.to_date >= CURRENT_DATE
              AND s.status >0
      WHERE 
          p.status =1 and`

    let whereClause = [];
    let params = [];
    if (categories) {
      const categoryList = Array.isArray(categories) ? categories : [categories];
      whereClause.push(`category IN (?)`);
      params.push(categoryList);
    }

    if (brands) {
      const brandList = Array.isArray(brands) ? brands : [brands];
      whereClause.push(`manufacturer IN (?)`);
      params.push(brandList);
    }

    if (whereClause.length > 0) {
      sql += `  ${whereClause.join(' AND ')}`;
    }

    sql += `ORDER BY p.sort_order LIMIT ? OFFSET ?`
    params.push(parseInt(limit, 10));
    params.push(parseInt(offset, 10));

    let countSql = `
      SELECT 
          COUNT(*) AS total
      FROM 
          products p 
      LEFT JOIN 
          splprices s ON s.p_id = p.id 
              AND s.from_date <= CURRENT_DATE 
              AND s.to_date >= CURRENT_DATE
              AND s.status > 0
      WHERE 
          p.status = 1
    `;

    if (whereClause.length > 0) {
      countSql += ` AND ${whereClause.join(' AND ')}`;
    }
    // Execute count query
    const [countRows] = await db.query(countSql, params);    
    // Calculate total number of pages
    const totalProducts = countRows[0].total;

    const [rows] = await db.query(sql, params);

    return {
      products: rows, 
      categories: categories,
      brands: brands,
      totalProducts: totalProducts,
    };
  } catch (error) {
    console.error(error);
  }
};

exports.totalProductCat = async (category) => {
  try {
    // const total = await db.query()
  } catch (error) {
    console.error(error);
  }
};

exports.fetchCategory = async () => {
  try {
    const cat = await db.query(
      `select * from categories where status >0 and p_id=0`
    );
    return cat[0];
  } catch (error) {
    console.error(error);
  }
};

exports.fetchSubCategory = async (slug) => {
  try {
    const p_id = await db.query("select id from categories where slug = ?", [
      slug,
    ]);
    if (p_id[0][0]) {
      const subCat = await db.query(
        `select * from categories where p_id = ? and status >0`,
        [p_id[0][0].id]
      );
      return subCat[0];
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};

exports.fetchManf = async (slug) => {
  try {
      const list = await db.query(
        "select * from manufacturers where  status >0"
      );
      return list[0];
  } catch (error) {
    console.error(error);
  }
};

exports.fetchContactContent = async () => {
  try {
    const contactContent = await db.execute(
      `SELECT contact_title as page_title, contact_meta_title as page_meta_title, contact_meta_desc as page_meta_desc,contact_cover as page_cover,contact_breadcrumb_name as breadcrumb_name,contact_form_name as form_name,contact_form_text as form_text FROM web_contents ;`
    );
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    const store_location = await db.query(
      "select * from store_location where 1"
    );
    const main_menu = await this.fetch_main_menu();
    return {
      globalContent: contactContent[0][0],
      store: store_location[0][0],
      store_setting: store_setting[0],
      main_menu,
    };
  } catch (error) {
    console.error(error);
  }
};

exports.fetchAddressContent = async () => {
  try {
    const contactContent = await db.execute(
      `SELECT address_title as page_title, address_meta_title as page_meta_title, address_meta_desc as page_meta_desc,address_page_cover as page_cover,address_breadcrumb_name as breadcrumb_name FROM web_contents ;`
    );
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    const store_location = await db.query(
      "select * from store_location where 1"
    );
    const main_menu = await this.fetch_main_menu();
    return {
      globalContent: contactContent[0][0],
      store: store_location[0][0],
      store_setting: store_setting[0],
      main_menu,
    };
  } catch (error) {
    console.error(error);
  }
};

exports.fetchStoreContent = async () => {
  try {
    const [storeContent] = await db.execute(
      `select store_title as page_title, store_meta_title as page_meta_title, store_meta_desc as page_meta_desc,store_cover as page_cover,store_data,store_breadcrumb as page_breadcrumb from web_contents`
    );
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    const main_menu = await this.fetch_main_menu();
    return {
      globalContent: storeContent[0],
      main_menu,
      store_setting: store_setting[0],
    };
  } catch (error) {
    console.error(error);
  }
};

exports.fetchAboutContent = async () => {
  try {
    const aboutContent = await db.execute(
      `SELECT about_title as page_title, about_meta_title as page_meta_title, about_meta_desc as page_meta_desc,about_cover as page_cover,about_long_desc,about_breadcrumb_name as breadcrumb_name,about_text as content,about_group_data as group_data FROM web_contents ;`
    );
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );
    const main_menu = await this.fetch_main_menu();
    var data = aboutContent[0][0].group_data;
    data = JSON.parse(data);
    const store_location = await db.query(
      "select * from store_location where 1"
    );
    const [brands] = await db.execute("select name from manufacturers");
    return {
      globalContent: aboutContent[0][0],
      data,
      brands,
      store_setting: store_setting[0],
      main_menu,
    };
  } catch (error) {
    console.error(error);
  }
};

exports.fetchProductPage = async (slug) => {
  try {
    const globalContent = await db.query(
      "select meta_title as page_meta_title, meta_desc as page_meta_desc, name as page_title from products where slug=?",
      [slug]
    );
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );
    const main_menu = await this.fetch_main_menu();

    const data = await db.query(
      "select p.*,s.amount as discount_amount, (p.price-COALESCE(s.amount,0)) as spl_price from products p left join splprices s on s.p_id = p.id where p.slug=? ",
      [slug]
    );
    const [active_offer] = await db.query(
      "select * from splprices where p_id = ? and from_date <=CURRENT_DATE and to_date >=CURRENT_DATE and status >=0",
      [data[0][0].id]
    );
    if (active_offer[0]) {
      data[0][0].spl_price = data[0][0].price - active_offer[0].amount;
    } else {
      data[0][0].spl_price = data[0][0].price;
    }
    const manufacturer = await db.query(
      "select * from manufacturers where id=?",
      [data[0][0].manufacturer]
    );
    const category = await db.query("select * from categories where id=?", [
      data[0][0].category,
    ]);
    const [reviews] = await db.query(
      "select *,users.id as user_id,reviews.id as id from reviews join users on users.id = reviews.user_id where reviews.product_id=? ",
      [data[0][0].id]
    );
    if (JSON.parse(data[0][0].related_product).length > 0) {
      const rp = JSON.parse(data[0][0].related_product);
      const placeholders = rp.map((x) => x).join(",");
      const relatedProducts = await db.query(
        `select * from products where status >0 and id in (${placeholders})`
      );
      return {
        reviews: reviews,
        data: data[0][0],
        main_menu: main_menu,
        category: category[0][0],
        relatedProducts: relatedProducts[0],
        manufacturer: manufacturer[0][0],
        store_setting: store_setting[0],
        globalContent: globalContent[0][0],
      };
    } else {
      return {
        reviews: reviews,
        data: data[0][0],
        relatedProducts: [],
        main_menu: main_menu,
        category: category[0][0],
        manufacturer: manufacturer[0][0],
        store_setting: store_setting[0],
        globalContent: globalContent[0][0],
      };
    }
  } catch (error) {
    console.error(error);
  }
};

exports.fetchCartData = async (req) => {
  const userId = req.session.user ? req.session.user.id : null;
  if (!userId) {
    req.session.cart = req.session.cart || {
      totalCount: 0,
      totalAmount: 0,
      products: [],
    };
  } else {
    const cartData = await db.query(
      `SELECT 
          p.id,p.name,p.slug,c.quantity,p.data_image,
          COALESCE(s.name, '') AS special_name, 
          COALESCE(s.amount, 0) AS discount_amount, 
          CASE
              WHEN s.amount IS NULL THEN p.price
              ELSE p.price - s.amount
          END AS spl_price
      FROM 
          products p 
      inner join cart c on c.product_id = p.id
      LEFT JOIN 
          splprices s ON s.p_id = p.id 
              AND s.from_date <= CURRENT_DATE 
              AND s.to_date >= CURRENT_DATE
              AND s.status > 0
      WHERE c.user_id=? `,
      [userId]
    );
    req.session.cart = {
      totalCount: 0,
      totalAmount: 0,
      products: [],
    };
    cartData[0].forEach((cartItem) => {
      console.log(cartItem , cartItem.spl_price * cartItem.quantity);
      req.session.cart.totalCount += cartItem.quantity;
      req.session.cart.totalAmount += cartItem.quantity * cartItem.spl_price;
      req.session.cart.products.push(cartItem);
    });
  }
  return req.session.cart;
};

exports.fetchCartContent = async () => {
  const main_menu = await this.fetch_main_menu();
  const globalContent = {
    page_title: "Packsafe Cart",
    page_meta_title: "Packsafe Cart",
    page_meta_desc: "Packsafe Cart",
    page_cover:'["media/banner.jpeg?width=1599&height=443&x=1&y=0"]'
  };
  const [store_setting] = await db.execute(
    "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
  );

  return { main_menu, globalContent, store_setting: store_setting[0] };
};

exports.fetchCheckoutData = async (req) => {
  try {
    const globalContent = await db.execute(
      `SELECT shop_title as page_title, shop_meta_title as page_meta_title, shop_meta_desc as page_meta_desc,shop_cover as page_cover,shop_breadcrumb_name as breadcrumb_name FROM web_contents ;`
    );
    const main_menu = await this.fetch_main_menu();
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    const userId = req.session.user ? req.session.user.id : null;
    if (userId) {
      const savedAddress = await db.execute(
        "select * from addresses where user_id=?",
        [userId]
      );
      return {
        globalContent: globalContent[0][0],
        main_menu,
        store_setting: store_setting[0],
        savedAddress: savedAddress[0],
      };
    } else {
      return {
        globalContent: globalContent[0][0],
        main_menu,
        store_setting: store_setting[0],
        savedAddress: [],
      };
    }
  } catch (error) {
    console.error(error);
  }
};

exports.fetch_main_menu = async () => {
  try {
    const main_menu = await db.query(
      "select name,direct_link,menu_type,menu_options from main_menu where status =1 order by sort_order"
    );
    main_menu[0].map((menu_item) => {
      if (menu_item.menu_options) {
        menu_item.menu_options = JSON.parse(menu_item.menu_options);
      }
    });
    return main_menu[0];
  } catch (error) {
    console.error(error);
  }
};
