const session = require("cookie-session");
const ejs = require("ejs");
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
    res.redirect("/posts?page=1");
  });
  app.use(require("./src/middlewares/findSearchSortPage"));

  app.use("/api/v1/user", require("./src/routes/api/user.api.route"));
  app.use("/api/v1/blog", require("./src/routes/api/blogPost.api.route"));
  app.use("/posts", require("./src/routes/view/blogPost.view.route"));
  app.use("/auth", require("./src/routes/view/user.view.route"));
  app.use(require("./src/middlewares/errorHandler"));
};
