const express = require("express");
const router = express.Router();
const path = require("path");
const webRoutes = require("./SubRoutes/webApi.js");
const cmsRoutes = require("./SubRoutes/cms_api.js");
const authRoutes = require("./SubRoutes/authApi.js");
const contentRoutes = require("./SubRoutes/content_api.js");
router.use("/api", cmsRoutes);
router.use("/api/content", contentRoutes);
router.use("/cms(*)", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "cms", "cms.html"));
});
router.use(webRoutes);
router.use("/auth", authRoutes);
router.use("*", (req, res) => {
  res.render("404");
});

module.exports = router;
