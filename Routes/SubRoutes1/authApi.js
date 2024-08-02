const {
  login,
  register,
  logout,
  verifyToken,
} = require("../../Controllers/WEB_Controllers/auth/auth");

const authRoutes = require("express").Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
authRoutes.use("/verify", verifyToken);
authRoutes.post("/logout", logout);

module.exports = authRoutes;
