const db = require("../../../utils/db");
const { fetchCartData, fetchCartContent } = require("../utils/dbUtils");

exports.addToCart = async (req, res) => {
  try {
    const productId = parseInt(req.body.productId);
    const prdQty = parseInt(req.body.quantity);

    const productData = await db.query(
      "select p.*,s.amount as discount_amount, (p.price-COALESCE(s.amount,0)) as spl_price from products p left join splprices s on s.p_id = p.id where p.id=? ",
      [productId]
    );
    const [active_offer] = await db.query(
      "select * from splprices where p_id = ? and from_date <=CURRENT_DATE and to_date >=CURRENT_DATE and status >=0",
      [productData[0][0].id]
    );
    if (active_offer[0]) {
      productData[0][0].spl_price =
        productData[0][0].price - active_offer[0].amount;
    } else {
      productData[0][0].spl_price = productData[0][0].price;
    }
    const userId = req.session.user ? req.session.user.id : null;

    if (
      prdQty > productData[0][0].quantity &&
      productData[0][0].substract_stock == 1
    ) {
      res.status(500).json({
        status: false,
        message: `Cant add more than ${productData[0][0].quantity}`,
      });
      return;
    }

    //initialize cart object
    if (!userId) {
      req.session.cart = req.session.cart || {
        totalCount: 0,
        totalAmount: 0,
        products: [],
      };
    } else {
      const cartData = await db.query(
        "select p.id,p.name,p.slug,p.data_image,p.price,c.quantity,s.amount as discount_amount,(p.price - COALESCE(s.amount, 0)) AS spl_price from products p inner join cart c on c.product_id = p.id left join splprices s on p.id = s.p_id where c.user_id=?",
        [userId]
      );
      req.session.cart = {
        totalCount: 0,
        totalAmount: 0,
        products: [],
      };
      cartData[0].forEach((cartItem) => {
        req.session.cart.totalCount += cartItem.quantity;
        req.session.cart.totalAmount += cartItem.quantity * cartItem.spl_price;
        req.session.cart.products.push(cartItem);
      });
    }

    const alreadyIncartIndex = req.session.cart.products.findIndex(
      (item) => item.id === productId
    );
    console.log(alreadyIncartIndex);
    if (alreadyIncartIndex === -1) {
      if (userId) {
        await db.query(
          "insert into cart (product_id,user_id,quantity) values(?,?,?)",
          [productId, userId, prdQty]
        );
      }
      req.session.cart.products.push({
        ...productData[0][0],
        quantity: parseInt(prdQty),
      });
      req.session.cart.totalCount += prdQty;
      req.session.cart.totalAmount +=
        parseInt(productData[0][0].spl_price) * prdQty;
      res.json({
        status: true,
        cart: req.session.cart,
        message: "Added to cart",
      });
    } else {
      const limit =
        req.session.cart.products[alreadyIncartIndex].quantity + prdQty;
      if (
        limit >= productData[0][0].quantity &&
        productData[0][0].substract_stock == 1
      ) {
        res.status(500).json({
          status: false,
          message: `Cant add more than ${productData[0][0].quantity}`,
        });
        return;
      }
      const updatedQuantity =
        req.session.cart.products[alreadyIncartIndex].quantity +
        parseInt(prdQty);
      if (userId) {
        await db.query(
          "UPDATE cart SET quantity=? WHERE product_id=? AND user_id=?",
          [updatedQuantity, productId, userId]
        );
      }
      req.session.cart.products[alreadyIncartIndex].quantity +=
        parseInt(prdQty);
      req.session.cart.totalCount += prdQty;
      req.session.cart.totalAmount +=
        parseInt(productData[0][0].spl_price) * prdQty;
      res.json({
        status: true,
        cart: req.session.cart,
        message: "Already in cart",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const productId = parseInt(req.body.productId);
    const userId = req.session.user ? req.session.user.id : null;
    console.log("Product ID to remove:", productId);

    // this function Ensure req.session.cart is properly initialized
    if (!req.session.cart || !req.session.cart.products) {
      req.session.cart = {
        products: [],
        totalCount: 0,
        totalAmount: 0,
      };
    }

    const alreadyIncartIndex = req.session.cart.products.findIndex(
      (item) => item.id === productId
    );

    if (alreadyIncartIndex === -1) {
      return res.json({ status: false, message: "Product not found in cart" });
    }

    const currProd = req.session.cart.products[alreadyIncartIndex];
    console.log("Current product:", currProd);

    // Remove the product from the cart
    if (userId) {
      await db.query("DELETE FROM cart WHERE product_id = ? AND user_id = ?", [
        productId,
        userId,
      ]);
      const cartData = await db.query(
        "select p.id,p.name,p.slug,p.data_image,p.price,c.quantity,s.amount as discount_amount,(p.price - COALESCE(s.amount, 0)) AS spl_price from products p inner join cart c on c.product_id = p.id left join splprices s on p.id = s.p_id where c.user_id=?",
        [userId]
      );
      console.log(cartData);
      req.session.cart = {
        totalCount: 0,
        totalAmount: 0,
        products: [],
      };
      cartData[0].forEach((cartItem) => {
        req.session.cart.totalCount += cartItem.quantity;
        req.session.cart.totalAmount += cartItem.quantity * cartItem.spl_price;
        req.session.cart.products.push(cartItem);
      });
    } else {
      // Update totalCount and totalAmount
      req.session.cart.totalCount -= currProd.quantity;
      req.session.cart.totalAmount -= currProd.quantity * currProd.spl_price;

      // Remove the product from the cart
      req.session.cart.products = req.session.cart.products.filter(
        (product) => product.id !== productId
      );
    }

    res.json({
      cart: req.session.cart,
      status: true,
      message: "Removed from cart",
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.json({ status: false, error: error.message });
  }
};

exports.increaseQuantity = (req, res) => {
  try {
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await fetchCartData(req);
    res.json(cart);
  } catch (error) {
    res.json({ error: error });
  }
};

// const isProductInCart = (productId, arr) => {
//   for (const element of arr) {
//     if (element.id === productId) {
//       return true;
//     }
//   }
//   return false;
// };

exports.cartController = async (req, res) => {
  try {
    const cart = await fetchCartData(req);
    const { main_menu, store_setting, globalContent } =
      await fetchCartContent();
    var user = req.session.user || {};
    res.render("cart", { cart, user, store_setting, globalContent, main_menu });
  } catch (error) {
    res.render("500");
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const userId = req.session.user?.id || null;
    if (userId) {
      await db.query("DELETE from cart WHERE user_id =?", [userId]);
      req.session.cart = {
        totalAmount: 0,
        totalCount: 0,
        products: [],
      };
    } else {
      req.session.cart = {
        totalAmount: 0,
        totalCount: 0,
        products: [],
      };
    }
    res.json({
      cart: req.session.cart,
      status: true,
      message: "Cart emptied",
    });
  } catch (error) {
    res.json({ error: error });
  }
};
