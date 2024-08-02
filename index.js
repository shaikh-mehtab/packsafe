const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "this-is-a-very-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "upload")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "cms")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(require("./Routes"));
const PORT = process.env.PORT || 6666;
app.listen(PORT, () => {
  console.log(`server started :- http://localhost:${process.env.PORT}`);
});

module.exports = app;
