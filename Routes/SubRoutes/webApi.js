const express = require("express");
const {
  homeControllers,
} = require("../../Controllers/WEB_Controllers/home/home");
const {
  aboutControllers,
} = require("../../Controllers/WEB_Controllers/about/about");
const {
  contactControllers,
  contactFormControllers,
} = require("../../Controllers/WEB_Controllers/contact/contact");
const {
  productControllers,
  addComment,
  removeComment,
} = require("../../Controllers/WEB_Controllers/product/product");
const {
  shopControllers,
} = require("../../Controllers/WEB_Controllers/shop/shop");
const {
  eStoreControllers,
} = require("../../Controllers/WEB_Controllers/e-store/estore");
const {
  addToCart,
  getCart,
  cartController,
  removeFromCart,
  emptyCart,
} = require("../../Controllers/WEB_Controllers/cart/cart");
const {
  checkoutController,
} = require("../../Controllers/WEB_Controllers/checkout/checkout");
const {
  loginController,
  registerController,
} = require("../../Controllers/WEB_Controllers/authView/authView");
const {
  createOrder,
  updateOrderStatus,
  getOrderDetails,
  orderDetailsController,
  ordersController,
  verifyCoupon,
  testMail,
} = require("../../Controllers/WEB_Controllers/order/order");
const {
  getByIdAddresses,
  updateByIdAddresses,
  deleteAddresses,
  getAllAddresses,
  addressController,
} = require("../../Controllers/WEB_Controllers/addresses/address");

const webRouter = express.Router();

webRouter.get("/", homeControllers);
webRouter.get("/about", aboutControllers);
webRouter.get("/cart", cartController);
webRouter.get("/contact", contactControllers);
webRouter.post("/contact-form", contactFormControllers);
webRouter.post("/verify-coupon",verifyCoupon)
webRouter.get("/shop", shopControllers);
webRouter.get("/product/:slug", productControllers);
webRouter.get("/e-store", eStoreControllers);
webRouter.get("/checkout", checkoutController);
webRouter.get("/login", loginController);
webRouter.get("/address", addressController);
webRouter.get("/orders", ordersController);
webRouter.get("/order-details/:id", orderDetailsController);
webRouter.get("/get-order-detail/:id", getOrderDetails);
webRouter.get("/register", registerController);
webRouter.post("/order", createOrder);
webRouter.post("/addComment", addComment);
webRouter.post("/removeComm", removeComment);
webRouter.post("/update-order-status", updateOrderStatus);
webRouter.post("/add-to-cart", addToCart);
webRouter.post("/remove-from-cart", removeFromCart);
webRouter.get("/empty-cart", emptyCart);
webRouter.get("/get-cart", getCart);
webRouter.get("/getAllAdresses", getAllAddresses);
webRouter.get("/getAdress/:id", getByIdAddresses);
webRouter.put("/updateAddress/:id", updateByIdAddresses);
webRouter.post("/deleteAdress/:id", deleteAddresses);
webRouter.get("/checkWorld",(req,res)=>{
  const countries = ["IN","AT","MV","SO","ZW","RU"]
  console.log(countries);
  res.render("world",{countries})
})
webRouter.get("/set-session-data", (req, res) => {
  // Set some data into the session
  req.session.cart = [];
  req.session.userId = 123;

  // Log the session to see if the data is stored
  console.log(req.session);

  res.send("Session data set");
});

webRouter.get("/view-session", (req, res) => {
  console.log(req.session);
  res.send("qwerty");
});

webRouter.get("/*", (req, res) => {
  res.render("404");
});

module.exports = webRouter;
