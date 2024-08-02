const express = require("express");
const router = express.Router();
const {
  getallInfoPage,
  getByIdInfoPage,
  updateByIdInfoPage,
  createInfoPage,
  deleteByIdInfoPage,
} = require("../../Controllers/CMS_Controllers/info_page.js");

const {
  getallWeight,
  getByIdWeight,
  createWeight,
  updateByIdWeight,
  deleteByIdWeight,
} = require("../../Controllers/CMS_Controllers/weight_class.js");

const {
  getallStock,
  getByIdStock,
  createStock,
  updateByIdStock,
  deleteByIdStock,
} = require("../../Controllers/CMS_Controllers/stock_status.js");

const {
  getAllCoupons,
  getByIdCoupons,
  createCoupons,
  updateByIdCoupons,
  deleteCoupons,
} = require("../../Controllers/CMS_Controllers/coupons.js");

const {
  getallProducts,
  getByIdProducts,
  createProducts,
  createImages,
  updateByIdProducts,
  updateImages,
  deleteByIdProducts,
} = require("../../Controllers/CMS_Controllers/products.js");

const {
  getAllManufacturer,
  getByIdManufacturer,
  updateByIdManufacturer,
  createManufacturer,
  deleteManufacturer,
} = require("../../Controllers/CMS_Controllers/manufacturer.js");

const {
  getAllLengthClass,
  getByIdLengthClass,
  updateByIdLengthClass,
  createLengthClass,
  deleteLengthClass,
} = require("../../Controllers/CMS_Controllers/length_class.js");

const {
  getallCategory,
  getByIdCategory,
  updateByIdCategory,
  createCategory,
  deleteByIdCategory,
} = require("../../Controllers/CMS_Controllers/category.js");

const {
  getallFilter,
  getByIdFilter,
  updateByIdFilter,
  createFilter,
  deleteByIdFilter,
} = require("../../Controllers/CMS_Controllers/filter.js");

const {
  getallFilterOptions,
  getByIdFilterOption,
  updateByIdFilterOption,
  createFilterOption,
  deleteByIdFilterOption,
} = require("../../Controllers/CMS_Controllers/filter_option.js");

const {
  getallOptions,
  getByIdOptions,
  updateByIdOptions,
  createOptions,
  deleteByIdOptions,
} = require("../../Controllers/CMS_Controllers/options.js");

const {
  getallOptionOptions,
  getByIdOptionOptions,
  updateByIdOptionOptions,
  createOptionOptions,
  deleteByIdOptionOptions,
} = require("../../Controllers/CMS_Controllers/option_options.js");

const {
  getAllApplicants,
  getByIdApplicants,
  updateByIdApplicants,
  createApplicants,
  deleteApplicants,
} = require("../../Controllers/CMS_Controllers/career.js");

const {
  getAllPositions,
  getByIdPositions,
  updateByIdPositions,
  createPositions,
  deletePositions,
} = require("../../Controllers/CMS_Controllers/positions.js");

const {
  getallEnquiry,
  getByIdEnquiry,
  updateByIdEnquiry,
  createEnquiry,
  deleteByIdEnquiry,
} = require("../../Controllers/CMS_Controllers/enquiry.js");

const {
  getallOrders,
  getByIdOrdersStatus,
  getByIdOrders,
  updateByIdOrdersStatus,
} = require("../../Controllers/CMS_Controllers/orders.js");

const {
  getAllSettings,
  updateByIdSettings,
} = require("../../Controllers/CMS_Controllers/setting.js");

const {
  getByIdOrdersDetail,
} = require("../../Controllers/CMS_Controllers/orders_detail.js");

const filemanager = require("../../Controllers/CMS_Controllers/filemanager.js");

const cropperLogic = require("../../Controllers/CMS_Controllers/cropper.js");

const middleware = require("../../middleware/auth.js");

router.post("/register", middleware.register);
router.post("/login", middleware.login);
router.get("/logout", middleware.logout);

/********Info-Page */
router.get("/getallInfoPage", getallInfoPage);
router.get("/getByIdInfoPage/:id", getByIdInfoPage);
router.put("/updateByIdInfoPage/:id", updateByIdInfoPage);
router.post("/createInfoPage", createInfoPage);
router.delete("/deleteByIdInfoPage/:id", deleteByIdInfoPage);

/*******Weight-Class */
router.get("/getallWeight", getallWeight);
router.get("/getByIdWeight/:id", getByIdWeight);
router.put("/updateByIdWeight/:id", updateByIdWeight);
router.post("/createWeight", createWeight);
router.delete("/deleteByIdWeight/:id", deleteByIdWeight);

/*******Stock-Status */
router.get("/getallStock", getallStock);
router.get("/getByIdStock/:id", getByIdStock);
router.put("/updateByIdStock/:id", updateByIdStock);
router.post("/createStock", createStock);
router.delete("/deleteByIdStock/:id", deleteByIdStock);

/***Coupons */
router.get("/getAllCoupons", getAllCoupons);
router.get("/getByIdCoupon/:id", getByIdCoupons);
router.post("/createCoupon", createCoupons);
router.put("/updateByIdCoupon/:id", updateByIdCoupons);
router.delete("/deleteByIdCoupon/:id", deleteCoupons);

/***Products */
router.get("/getAllProducts", getallProducts);
router.get("/getByIdProduct/:id", getByIdProducts);
router.post("/createProduct", createProducts);
router.post("/createImages", createImages);
router.put("/updateImages", updateImages);
router.put("/updateByIdProduct/:id", updateByIdProducts);
router.delete("/deleteByIdProduct/:id", deleteByIdProducts);

/**Manufacturer */
router.get("/getAllManufacturer", getAllManufacturer);
router.get("/getByIdManufacturer/:id", getByIdManufacturer);
router.post("/createManufacturer", createManufacturer);
router.put("/updateByIdManufacturer/:id", updateByIdManufacturer);
router.delete("/deleteByIdManufacturer/:id", deleteManufacturer);

/**Length class */
router.get("/getAllLength", getAllLengthClass);
router.get("/getByIdLength/:id", getByIdLengthClass);
router.post("/createLength", createLengthClass);
router.put("/updateByIdLength/:id", updateByIdLengthClass);
router.delete("/deleteByIdLength/:id", deleteLengthClass);

/**Categoriess */
router.get("/getAllCategories", getallCategory);
router.get("/getByIdCategory/:id", getByIdCategory);
router.post("/createCategory", createCategory);
router.put("/updateByIdCategory/:id", updateByIdCategory);
router.delete("/deleteByIdCategory/:id", deleteByIdCategory);

/**Filters */
router.get("/getAllFilters", getallFilter);
router.get("/getByIdFilter/:id", getByIdFilter);
router.post("/createFilter", createFilter);
router.put("/updateByIdFilter/:id", updateByIdFilter);
router.delete("/deleteByIdFilter/:id", deleteByIdFilter);

/**Filters Option*/
router.get("/getAllFilterOptions", getallFilterOptions);
router.get("/getByIdFilterOption/:id", getByIdFilterOption);
router.post("/createFilterOption", createFilterOption);
router.put("/updateByIdFilterOption/:id", updateByIdFilterOption);
router.delete("/deleteByIdFilterOption/:id", deleteByIdFilterOption);

/**APLLICANTS routes*/
router.get("/getAllApplicants", getAllApplicants);
router.get("/getByIdApplicants/:id", getByIdApplicants);
router.post("/createApplicants", createApplicants);
router.put("/updateByIdApplicants/:id", updateByIdApplicants);
router.delete("/deleteByIdApplicants/:id", deleteApplicants);

//POSITIONS routes
router.get("/getAllPositions", getAllPositions);
router.get("/getByIdPositions/:id", getByIdPositions);
router.post("/createPositions", createPositions);
router.put("/updateByIdPositions/:id", updateByIdPositions);
router.delete("/deleteByIdPositions/:id", deletePositions);

/***Enquiry Routes */
router.get("/getAllEnquiry", getallEnquiry);
router.get("/getByIdEnquiry/:id", getByIdEnquiry);
router.post("/createEnquiry", createEnquiry);
router.put("/updateByIdEnquiry/:id", updateByIdEnquiry);
router.delete("/deleteByIdEnquiry/:id", deleteByIdEnquiry);

// filemanager
router.get("/get-files/:directory(*)", filemanager.fetchAllFiles);
router.post("/create-directory/:directory(*)", filemanager.createDirectory);
router.post("/upload-file/:directory(*)", filemanager.uploadFile);
router.delete("/delete-directory/:directory(*)", filemanager.deleteDirectory);

//image cropper
router.get("/transform/:filename(*)", cropperLogic.cropperLogic);

//options
router.get("/getAllOptions", getallOptions);
router.get("/getByIdOptions/:id", getByIdOptions);
router.post("/createOptions", createOptions);
router.put("/updateByIdOptions/:id", updateByIdOptions);
router.delete("/deleteByIdOptions/:id", deleteByIdOptions);

//option_options
router.get("/getAllOptionOptions", getallOptionOptions);
router.get("/getByIdOptionOptions/:id", getByIdOptionOptions);
router.post("/createOptionOptions", createOptionOptions);
router.put("/updateByIdOptionOptions/:id", updateByIdOptionOptions);
router.delete("/deleteByIdOptionOptions/:id", deleteByIdOptionOptions);

//Orders
router.get("/getAllOrders", getallOrders);
router.get("/getByIdOrdersStatus/:id", getByIdOrdersStatus);
router.get("/getByIdOrders/:id", getByIdOrders);
router.put("/updateByIdOrdersStatus/:id", updateByIdOrdersStatus);

//Orders Detail
router.get("/getByIdOrdersDetail/:id", getByIdOrdersDetail);

//Settings
router.get("/getAllSettings", getAllSettings);
router.put("/updateByIdSettings/:id", updateByIdSettings);

module.exports = router;
