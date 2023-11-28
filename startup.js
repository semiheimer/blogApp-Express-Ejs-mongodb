const session = require("cookie-session");
const ejs = require("ejs");
const authentication = require("./src/middlewares/authentication");

module.exports = function (app, express) {
  app.use(
    session({ secret: process.env.SECRET_KEY || "secret_keys_for_cookies" }),
  );

  ejs.openDelimiter = "{";
  ejs.closeDelimiter = "}";

  app.set("view engine", "ejs");
  app.set("views", "./src/views");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/assets", express.static("./public/assets"));

  app.all("/", (req, res) => {
    res.redirect("/posts");
  });
  app.use(require("./src/middlewares/findSearchSortPage"));

  app.get("/api/v1/test", (req, res) => {
    res.json({ msg: "test route" });
  });
  //API ROUTES
  app.use("/api/v1/users", require("./src/routes/api/user.api.route"));
  app.use("/api/v1/posts", require("./src/routes/api/blogPost.api.route"));
  app.use("/api/v1/", require("./src/routes/api/auth.api.router"));
  //VIEW ROUTES
  app.use("/posts", require("./src/routes/view/blogPost.view.route"));
  app.use("/auth", require("./src/routes/view/auth.view.route"));
  app.use("/users", require("./src/routes/view/user.view.route"));
  app.use(require("./src/middlewares/errorHandler"));
};
