const express = require("express");
const router = express.Router();

const {
  getallWebAbout,
  updateWebAbout,
} = require("../../Controllers/CMS_Controllers/webController/about.js");

const {
  getallWebContact,
  updateWebContact,
} = require("../../Controllers/CMS_Controllers/webController/contact..js");

const {
  getallWebHome,
  updateWebHome,
  updateSlider,
  deletebyidSlider,
} = require("../../Controllers/CMS_Controllers/webController/home.js");

const {
  getallWebHomeFeature,
  updateWebHomeFeature,
  deletebyidbanner,
  deletebyidfeature,
  updateFeature,
  updateBanner,
} = require("../../Controllers/CMS_Controllers/webController/home_feature.js");

const {
  getallWebEstore,
  updateByIdWebEstore,
  updateStoreData,
  deletebyidStoreData,
} = require("../../Controllers/CMS_Controllers/webController/estore.js");

const {
  getallWebAddress,
  updateByIdWebAddress,
} = require("../../Controllers/CMS_Controllers/webController/address.js");

const {
  getallWebShop,
  updateByIdWebShop,
} = require("../../Controllers/CMS_Controllers/webController/shop.js");

//Web-Content-About
router.get("/getAllWebAbout", getallWebAbout);
router.put("/updateWebAbout/:id", updateWebAbout);

//Web-Content-Contact
router.get("/getallWebContact", getallWebContact);
router.put("/updateWebContact/:id", updateWebContact);

//Web-Content-Shop
router.get("/getallWebShop", getallWebShop);
router.put("/updateByIdWebShop/:id", updateByIdWebShop);

router.get("/getAllWebHome", getallWebHome);
router.put("/updateWebHome/:id", updateWebHome);
router.put("/updateSlider/:id", updateSlider);
router.delete("/deleteByIdSlider/:id", deletebyidSlider);

router.get("/getAllWebHomeFeature", getallWebHomeFeature);
router.put("/updateWebHomeFeature/:id", updateWebHomeFeature);
router.put("/updateFeature/:id", updateFeature);
router.put("/updateBanner/:id", updateBanner);
router.delete("/deleteByIdFeature/:id", deletebyidfeature);
router.delete("/deleteByIdBanner/:id", deletebyidbanner);

router.get("/getallWebEstore", getallWebEstore);
router.put("/updateByIdWebEstore/:id", updateByIdWebEstore);
router.put("/updateStoreData/:id", updateStoreData);
router.delete("/deleteByIdStoreData/:id", deletebyidStoreData);

router.get("/getallWebAddress", getallWebAddress);
router.put("/updateByIdWebAddress/:id", updateByIdWebAddress);

module.exports = router;
