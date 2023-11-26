"use strict";
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

require("./startup")(app, express);

try {
  //if (process.env.NODE_ENV === "development") require("./src/helpers/sync")();
  require("./src/dbConnection");
  app.listen(PORT, () => {
    console.log("http://127.0.0.1:" + PORT);
  });
} catch (error) {
  console.log("Error: ", error);
  process.exit(1);
}
