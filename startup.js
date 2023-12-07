const session = require("cookie-session");
const ejs = require("ejs");
const apiAuthentication = require("./src/middlewares/apiAuthentication");
const viewAuthentication = require("./src/middlewares/viewAuthentication");
const permissions = require("./src/middlewares/permissions");

module.exports = function (app, express) {
  app.use(
    session({
      secret: process.env.SECRET_KEY || "secret_keys_for_cookies",
      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
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

  app.get("/api/v1/test", (req, res) => {
    res.json({ msg: "test route" });
  });
  //API ROUTES
  app.use(
    "/api/v1/users",
    apiAuthentication,
    require("./src/routes/api/user.api.route"),
  );
  app.use("/api/v1/posts", require("./src/routes/api/blogPost.api.route"));
  app.use("/api/v1/auth", require("./src/routes/api/auth.api.router"));
  //VIEW ROUTES
  app.use("/posts", require("./src/routes/view/blogPost.view.route"));
  app.use("/auth", require("./src/routes/view/auth.view.route"));
  app.use(
    "/users",
    viewAuthentication,
    permissions.isAdmin,
    require("./src/routes/view/user.view.route"),
  );

  //Not found
  app.use("/api/v1/*", (req, res) => {
    res.status(404).json({ msg: "not found" });
  });
  app.use("*", (req, res) => {
    const user = req?.session.user ? req?.session.user : null;
    res.render("404", { user });
  });

  app.use(require("./src/middlewares/errorHandler"));
};
