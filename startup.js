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

  app.use(require("./src/middlewares/findSearchSortPage"));

  app.use("/api/v1/user", require("./src/routes/api/user.api.route"));
  app.use("/api/v1/blog", require("./src/routes/api/blogPost.api.route"));
  app.use("/", require("./src/routes/view/blogPost.view.route"));

  app.use(require("./src/errorHandler"));
};
