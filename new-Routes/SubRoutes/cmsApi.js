// const express = require("express");
// const {
//   getAllAdmin,
//   getByIdAdmin,
//   updateByIdAdminDetails,
//   deleteAdmin,
//   createAdmin,
// } = require("../../Controllers/CMS_Controllers/admin");

// const {
//   getAllManufacturer,
//   getByIdManufacturer,
//   updateByIdManufacturer,
//   createManufacturer,
//   deleteManufacturer,
// } = require("../../Controllers/CMS_Controllers/manufacturer");

// const {
//   getAllLengthClass,
//   getByIdLengthClass,
//   updateByIdLengthClass,
//   createLengthClass,
//   deleteLengthClass,
// } = require("../../Controllers/CMS_Controllers/lengthclass");

// const {
//   getAllApplicants,
//   getByIdApplicants,
//   updateByIdApplicants,
//   createApplicants,
//   deleteApplicants,
// } = require("../../Controllers/CMS_Controllers/career");

// const {
//   getAllPositions,
//   getByIdPositions,
//   updateByIdPositions,
//   createPositions,
//   deletePositions,
// } = require("../../Controllers/CMS_Controllers/positions");

// const {
//   getAllReviews,
//   getByIdReviews,
//   updateByIdReviews,
//   createReviews,
//   deleteReviews,
// } = require("../../Controllers/CMS_Controllers/reviews");

// const {
//   getAllAddresses,
//   getByIdAddresses,
//   updateByIdAddresses,
//   createAddresses,
//   deleteAddresses,
// } = require("../../Controllers/CMS_Controllers/addresses");
// const {
//   getAllCoupons,
//   getByIdCoupons,
//   createCoupons,
//   updateByIdCoupons,
//   deleteCoupons,
// } = require("../../Controllers/CMS_Controllers/coupons");

// const {
//   getAllEnquiry,
//   getByIdEnquiry,
//   updateByIdEnquiry,
//   createEnquiry,
//   deleteEnquiry,
// } = require("../../Controllers/CMS_Controllers/enquiry");
// const {
//   cropperLogic,
// } = require("../../Controllers/CMS_Controllers/cropperLogic");

// const cmsRouter = express.Router();

// // ADMIN routes
// cmsRouter.get("/getAllAdmin", getAllAdmin);
// cmsRouter.get("/getByIdAdmin/:id", getByIdAdmin);
// cmsRouter.post("/createAdmin", createAdmin);
// cmsRouter.put("/updateAdminDetails/:id", updateByIdAdminDetails);
// cmsRouter.delete("/deleteByIdAdmin/:id", deleteAdmin);

// //MANUFACTURER routes
// cmsRouter.get("/getAllManufacturer", getAllManufacturer);
// cmsRouter.get("/getByIdManufacturer/:id", getByIdManufacturer);
// cmsRouter.post("/createManufacturer", createManufacturer);
// cmsRouter.put("/updateByIdManufacturer/:id", updateByIdManufacturer);
// cmsRouter.delete("/deleteByIdManufacturer/:id", deleteManufacturer);

// //LENGTHCLASS routes
// cmsRouter.get("/getAllLength", getAllLengthClass);
// cmsRouter.get("/getByIdLength/:id", getByIdLengthClass);
// cmsRouter.post("/createLength", createLengthClass);
// cmsRouter.put("/updateByIdLength/:id", updateByIdLengthClass);
// cmsRouter.delete("/deleteByIdLength/:id", deleteLengthClass);

// //APLLICANTS routes
// cmsRouter.get("/getAllApplicants", getAllApplicants);
// cmsRouter.get("/getByIdApplicants/:id", getByIdApplicants);
// cmsRouter.post("/createApplicants", createApplicants);
// cmsRouter.put("/updateByIdApplicants/:id", updateByIdApplicants);
// cmsRouter.delete("/deleteByIdApplicants/:id", deleteApplicants);

// //POSITIONS routes
// cmsRouter.get("/getAllPositions", getAllPositions);
// cmsRouter.get("/getByIdPositions/:id", getByIdPositions);
// cmsRouter.post("/createPositions", createPositions);
// cmsRouter.put("/updateByIdPositions/:id", updateByIdPositions);
// cmsRouter.delete("/deleteByIdPositions/:id", deletePositions);

// //REVIEWS routes
// cmsRouter.get("/getAllReviews", getAllReviews);
// cmsRouter.get("/getByIdReviews/:id", getByIdReviews);
// cmsRouter.post("/createReviews", createReviews);
// cmsRouter.put("/updateByIdReview/:id", updateByIdReviews);
// cmsRouter.delete("/deleteByIdReview/:id", deleteReviews);

// //ADDRESSES routes
// cmsRouter.get("/getAllAddresses", getAllAddresses);
// cmsRouter.get("/getByIdAddresses/:id", getByIdAddresses);
// cmsRouter.post("/createAddress", createAddresses);
// cmsRouter.put("/updateByIdAddresses/:id", updateByIdAddresses);
// cmsRouter.delete("/deleteByIdAddress/:id", deleteAddresses);

// //COUPONS routes
// cmsRouter.get("/getAllCoupons", getAllCoupons);
// cmsRouter.get("/getByIdCoupon/:id", getByIdCoupons);
// cmsRouter.post("/createCoupon", createCoupons);
// cmsRouter.put("/updateByIdCoupon/:id", updateByIdCoupons);
// cmsRouter.delete("/deleteByIdCoupon/:id", deleteCoupons);

// //ENQUIRY routes
// cmsRouter.get("/getAllEnquiry", getAllEnquiry);
// cmsRouter.get("/getByIdEnquiry/:id", getByIdEnquiry);
// cmsRouter.post("/createEnquiry", createEnquiry);
// cmsRouter.put("/updateByIdEnquiry/:id", updateByIdEnquiry);
// cmsRouter.delete("/deleteByIdEnquiry/:id", deleteEnquiry);

//cropper logic
// cmsRouter.get("/transform/:filename(*)", cropperLogic);
// cmsRouter.get("*", (req, res) => {
//   resizeBy.send("work");
// });

// module.exports = cmsRouter;
