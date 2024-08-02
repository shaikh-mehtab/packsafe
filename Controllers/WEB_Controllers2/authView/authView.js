const db = require("../../../utils/db");

exports.loginController = async (req, res) => {
  if (!req.session.user) {
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    res.render("login", {
      globalContent: {
        page_title: "Login",
        page_meta_title: "Login",
        page_meta_desc: "Login",
      },
      store_setting: store_setting[0],
    });
  } else {
    res.redirect("/");
  }
};

exports.registerController = async (req, res) => {
  const [store_setting] = await db.execute(
    "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
  );
  if (!req.session.user) {
    res.render("register", {
      store_setting: store_setting,
      globalContent: {
        page_title: "Register",
        page_meta_title: "Register",
        page_meta_desc: "Register",
      },
    });
  } else {
    res.redirect("/");
  }
};
